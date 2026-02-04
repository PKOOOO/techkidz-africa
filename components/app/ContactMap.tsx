"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type ContactMapProps = {
    accessToken?: string;
    lat: number;
    lng: number;
    zoom?: number;
};

export function ContactMap({ accessToken, lat, lng, zoom = 15 }: ContactMapProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!containerRef.current || !accessToken || mapRef.current) return;

        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: containerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom,
        });

        map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

        new mapboxgl.Marker({ color: "#6A1383" }).setLngLat([lng, lat]).addTo(map);

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [accessToken, lat, lng, zoom]);

    if (!accessToken) {
        return (
            <div className="h-80 md:h-[420px] flex items-center justify-center text-gray-500">
                Map unavailable
            </div>
        );
    }

    return <div ref={containerRef} className="h-80 md:h-[420px] w-full" />;
}
