import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useGeolocation } from '@/hooks/use-geolocation';
import { cn } from '@/lib/utils';

interface LocationButtonProps {
  onLocationDetected?: (city: string) => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  onLocationDetected,
  onError,
  className,
  variant = 'outline',
  size = 'md',
  showText = true
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { 
    getCurrentPosition, 
    isLoading, 
    error, 
    city, 
    isSupported,
    hasCity 
  } = useGeolocation();

  // Previne hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    getCurrentPosition();
  };

  // Callback când se detectează locația
  React.useEffect(() => {
    if (city && onLocationDetected) {
      onLocationDetected(city);
    }
  }, [city, onLocationDetected]);

  // Callback pentru erori
  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Nu randa până nu e mounted (previne hydration mismatch)
  if (!isMounted || !isSupported) {
    return (
      <Button
        variant={variant}
        size="sm"
        disabled
        className={cn(
          size === 'sm' ? 'h-8 px-3 text-sm' : 
          size === 'md' ? 'h-10 px-4' : 'h-12 px-6 text-base',
          'flex items-center gap-2 opacity-50',
          className
        )}
      >
        <MapPin className={
          size === 'sm' ? 'h-3 w-3' : 
          size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
        } />
        {showText && <span className="whitespace-nowrap">GPS</span>}
      </Button>
    );
  }

  const buttonSizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        buttonSizes[size],
        'flex items-center gap-2',
        hasCity && 'text-brand-primary border-brand-primary/30',
        error && 'text-red-600 border-red-200',
        className
      )}
      title={hasCity ? `Locația detectată: ${city}` : 'Detectează locația ta'}
    >
      {isLoading ? (
        <Loader2 className={cn(iconSizes[size], 'animate-spin')} />
      ) : error ? (
        <AlertCircle className={cn(iconSizes[size], 'text-red-500')} />
      ) : (
        <MapPin className={cn(iconSizes[size], hasCity && 'text-brand-primary')} />
      )}
      
      {showText && (
        <span className="whitespace-nowrap">
          {isLoading ? 'Se detectează...' : 
           hasCity ? city : 
           error ? 'Eroare' : 
           'Locația mea'}
        </span>
      )}
    </Button>
  );
};
