import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getRiderLocations, fetchAssignmentsLocations } from "../../Utils/api";

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const riderMarkersRef = useRef({});
  const riderIdToColorMapRef = useRef({});

  // Constants
  const updateInterval = 10000; // Update interval in milliseconds (10 seconds)

  // Initialize the map
  useEffect(() => {
    mapboxgl.accessToken = "your_mapbox_token_here";

    if (!map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [73.034135, 33.688484], // Default center
        zoom: 10, // Default zoom level
      });

      mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");
      setMap(mapInstance); // Set the map object
    }

    return () => {
      if (map) {
        map.remove(); // Clean up the map instance on component unmount
      }
    };
  }, [map]);

  // Update rider markers at intervals
  useEffect(() => {
    if (map) {
      const updateRiderMarkers = async () => {
        const locations = await getRiderLocations();
        renderRiderMarkers(locations);
      };

      updateRiderMarkers();
      const intervalId = setInterval(updateRiderMarkers, updateInterval);
      return () => clearInterval(intervalId);
    }
  }, [map]);

  // Render rider markers on the map
  const renderRiderMarkers = async (locations) => {
    locations.forEach(async ({ id, data: { riderCoordinates } }) => {
      const marker = riderMarkersRef.current[id];

      if (marker) {
        // Marker exists, update its position
        marker.setLngLat([
          parseFloat(riderCoordinates.long),
          parseFloat(riderCoordinates.lat),
        ]);
      } else {
        // Marker doesn't exist, create a new one
        const Riders = await fetchAssignmentsLocations(id);
        const riderName = Riders.data.riderInfo.name;

        const color = getColorForRider(id); // Get color for rider

        const newMarker = new mapboxgl.Marker({
          color: color,
        })
          .setLngLat([
            parseFloat(riderCoordinates.long),
            parseFloat(riderCoordinates.lat),
          ])
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
              `<p>Rider Name: ${riderName}</p>`
            )
          )
          .addTo(map);

        riderMarkersRef.current[id] = newMarker;
      }
    });
  };

  // Function to get color for a rider based on rider ID
  const getColorForRider = (riderId) => {
    if (riderIdToColorMapRef.current[riderId]) {
      // If color is already assigned, return it
      return riderIdToColorMapRef.current[riderId];
    } else {
      // Generate a random color and store it
      const color = getRandomColor();
      riderIdToColorMapRef.current[riderId] = color;
      return color;
    }
  };

  // Function to generate a random color
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }} ref={mapContainer} />;
};

export default Map;
