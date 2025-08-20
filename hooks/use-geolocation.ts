import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  city: string | null;
  error: string | null;
  isLoading: boolean;
  isSupported: boolean;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean;
  autoFetch?: boolean;
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const {
    enableHighAccuracy = true,
    timeout = 15000,
    maximumAge = 300000, // 5 minutes
    watchPosition = false,
    autoFetch = false
  } = options;

  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    city: null,
    error: null,
    isLoading: false,
    isSupported: false
  });

  // Set isSupported în useEffect pentru a evita hydration mismatch
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isSupported: typeof navigator !== 'undefined' && 'geolocation' in navigator
    }));
  }, []);

  // Reverse geocoding pentru a obține orașul din coordonate
  const getCityFromCoordinates = async (lat: number, lng: number): Promise<string | null> => {
    try {
      // Folosim Nominatim (OpenStreetMap) pentru reverse geocoding - gratuit
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=ro,en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      
      // Extrage orașul din răspuns
      const city = data.address?.city || 
                  data.address?.town || 
                  data.address?.village || 
                  data.address?.municipality ||
                  data.address?.county ||
                  'Locație necunoscută';
                  
      return city;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  };

  const getCurrentPosition = useCallback(() => {
    if (!state.isSupported) {
      setState(prev => ({
        ...prev,
        error: 'Geolocalizarea nu este suportată de acest browser'
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      
      // Obține numele orașului
      const city = await getCityFromCoordinates(latitude, longitude);
      
      setState(prev => ({
        ...prev,
        latitude,
        longitude,
        accuracy,
        city,
        isLoading: false,
        error: null
      }));
    };

    const error = (err: GeolocationPositionError) => {
      let errorMessage = 'Eroare necunoscută';
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'Accesul la locație a fost refuzat. Te rugăm să permiți accesul în setările browser-ului.';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Informațiile despre locație nu sunt disponibile.';
          break;
        case err.TIMEOUT:
          errorMessage = 'Cererea de localizare a expirat. Te rugăm să încerci din nou.';
          break;
      }
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge
    };

    if (watchPosition) {
      const watchId = navigator.geolocation.watchPosition(success, error, geoOptions);
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      navigator.geolocation.getCurrentPosition(success, error, geoOptions);
    }
  }, [state.isSupported, enableHighAccuracy, timeout, maximumAge, watchPosition]);

  // Auto-fetch la mount dacă este setat
  useEffect(() => {
    if (autoFetch && state.isSupported) {
      getCurrentPosition();
    }
  }, [autoFetch, state.isSupported, getCurrentPosition]);

  const clearLocation = useCallback(() => {
    setState(prev => ({
      ...prev,
      latitude: null,
      longitude: null,
      accuracy: null,
      city: null,
      error: null,
      isLoading: false
    }));
  }, []);

  return {
    ...state,
    getCurrentPosition,
    clearLocation,
    // Helper functions
    isLocationAvailable: state.latitude !== null && state.longitude !== null,
    hasCity: state.city !== null,
    // Distance calculation helper
    calculateDistance: useCallback((lat2: number, lng2: number) => {
      if (state.latitude === null || state.longitude === null) return null;
      
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - state.latitude) * Math.PI / 180;
      const dLng = (lng2 - state.longitude) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(state.latitude * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    }, [state.latitude, state.longitude])
  };
};
