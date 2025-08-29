"use client";

import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Înlocuiește cu tokenul tău Mapbox

interface Craftsman {
  id: string;
  businessName: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  county?: string;
}

export default function ListareMeseriasi() {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/craftsmen") // Endpointul trebuie să returneze lista tuturor meseriașilor
      .then((res) => res.json())
      .then((data) => {
        setCraftsmen(data.data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || craftsmen.length === 0) return;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [25.0, 45.94], // Centru România
      zoom: 6,
    });
    craftsmen.forEach((c) => {
      if (c.latitude && c.longitude) {
        const marker = new mapboxgl.Marker()
          .setLngLat([c.longitude, c.latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<strong>${c.businessName}</strong><br/>${c.city || ""}, ${c.county || ""}<br/><a href='/mesterias/profil/${c.id}'>Vezi profil</a>`
            )
          )
          .addTo(map);
      }
    });
    return () => map.remove();
  }, [loading, craftsmen]);

  return (
    <div>
      <h1>Meseriași pe hartă</h1>
      <div id="map" style={{ width: "100%", height: "500px", borderRadius: "8px" }} />
      {loading && <p>Se încarcă...</p>}
    </div>
  );
}
