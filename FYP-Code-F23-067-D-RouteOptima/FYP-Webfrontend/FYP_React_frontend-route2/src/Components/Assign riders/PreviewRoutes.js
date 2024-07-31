import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {  Button } from 'antd';

const PreviewRoutes = ({ subroutes, routeToShow,setRouteToShow }) => {
  // console.log("sub_routes: ", subroutes);
  // console.log("parentRouteToShow: ", parentRouteToShow);

  const [map, setMap] = useState(null);
  const markers = useRef([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluYWhpbGwiLCJhIjoiY2xzZzZsMDBuMWVrOTJscGN6ZHQ0cjN0ZiJ9.oID5NvKkd-ab3WdXXnhvjQ';

    const initializeMap = () => {
      try {
        const mapContainer = document.getElementById('map');
        const mapInstance = new mapboxgl.Map({
          container: mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [73.0479, 33.6844], // Example center coordinates
          zoom: 12,
        });
        mapInstance.on('load', () => {
          setMap(mapInstance);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  useEffect(() => {
    // If map has been set, then whenever it is completed loaded, then set the route to show
    if (map) {
      console.log("Map is set, calling updateMap()");
      updateMap();
    }
  }, [map]);

  const handlePreview = () => {
    console.log("Preview Button is Pressed: ", subroutes);
    setRouteToShow(subroutes);
  };

  const addUpdatePolyline = (subroute, color) => {
    try {
      const polyline = subroute.polyline.polyline;
      const polylineCoordinates = polyline.map((coord) => [coord.long, coord.lat]);

      // Add a GeoJSON source with a unique ID for each subroute
      map.addSource(`polyline-source-${subroute.subroute_id}`, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: polylineCoordinates,
          },
        },
      });

      // Add a polyline layer with a unique ID and color for each subroute
      map.addLayer({
        id: `polyline-layer-${subroute.subroute_id}`,
        type: "line",
        source: `polyline-source-${subroute.subroute_id}`,
        layout: {
          "line-join": "round",
          "line-cap": "round",
          visibility: "visible",
        },
        paint: {
          "line-color": color,
          "line-width": 8,
        },
      });

      // ------------------------------------------------------------------------
      // Extract delivery points from the subroute data
      const parcelCoordinates = subroute.polylines.map(
        (polyline) => ({
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [
              polyline.destinationCoordinates.long,
              polyline.destinationCoordinates.lat,
            ],
          },
        })
      );

      // Add parcel locations data to the source
      map.addSource(`parcel-locations-source-${subroute.subroute_id}`, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: parcelCoordinates,
        },
      });

      // Add parcel locations layer with an ID
      map.addLayer({
        id: `parcel-locations-layer-${subroute.subroute_id}`,
        type: "circle",
        source: `parcel-locations-source-${subroute.subroute_id}`, // Reference the source ID
        paint: {
          "circle-radius": 8,
          "circle-color": "black",
        },
        layout: {
          visibility: "visible",
        },
      });
    } catch (error) {
      console.error("Error adding/updating polylines:", error);
    }
  };

  const addUpdateSdMarker = (subroute) => {
    try {
      // A red colored marker for the destination
      const dstMarker = new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat([
          subroute.polyline.destinationCoordinates.long,
          subroute.polyline.destinationCoordinates.lat,
        ])
        .addTo(map);

      // A green colored marker for the source
      const srcMarker = new mapboxgl.Marker({ color: "#00FF00" })
        .setLngLat([
          subroute.polyline.sourceCoordinates.long,
          subroute.polyline.sourceCoordinates.lat,
        ])
        .addTo(map);
      console.log("Destination Coord: ", subroute.polyline.destinationCoordinates.long, subroute.polyline.destinationCoordinates.lat)

      // Add the markers to the markers array
      const subrouteMarkers = [dstMarker, srcMarker];
      markers.current.push(subrouteMarkers);
    }
    catch (error) {
      console.error("Error adding/updating markers:", error);
    }
  };

  function updateMap() {
    if (!map || !routeToShow) return;

    console.log("Updating map with routeToShow: ", routeToShow);

    // Clear existing polylines
    subroutes.forEach(subroute => {
      // ----------------- Remove Polylines -----------------
      // If the layer exists, remove it
      if (map.getLayer(`polyline-layer-${subroute.subroute_id}`)) {
        map.removeLayer(`polyline-layer-${subroute.subroute_id}`);
      }
      // If the source exists, remove it
      if (map.getSource(`polyline-source-${subroute.subroute_id}`)) {
        map.removeSource(`polyline-source-${subroute.subroute_id}`);
      }

      // ----------------- Remove Parcel Locations -----------------
      // If the layer exists, remove it
      if (map.getLayer(`parcel-locations-layer-${subroute.subroute_id}`)) {
        map.removeLayer(`parcel-locations-layer-${subroute.subroute_id}`);
      }
      // If the source exists, remove it
      if (map.getSource(`parcel-locations-source-${subroute.subroute_id}`)) {
        map.removeSource(`parcel-locations-source-${subroute.subroute_id}`);
      }
    });

    // Clear all existing markers
    markers.current.forEach(subrouteMarkers => {
      subrouteMarkers.forEach(marker => marker.remove());
    });
    // Clear the markers array
    markers.current = [];

    // Define an array containing predefined colors (Blue, Brown, Pink, Purple, Orange, Green, Yellow, Red)
    const colors = ["#1C9290", "#A5A17E", "#FFA45D", "#B581C9", "#FFA500", " #4DC660 ", "#FDF616", "#BE5E22"];

    // Add/update polylines for each subroute
    // Iterate over each subroute and get the index of the subroute to get the color
    routeToShow.forEach(subroute => {
      const color = colors[subroute.subroute_id % colors.length]; // Get the color based on the index
      addUpdatePolyline(subroute, color);
      addUpdateSdMarker(subroute);
    });
  }

  useEffect(() => {
    updateMap();
  }, [routeToShow]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '900px' }} />
      <div style={{ textAlign: 'center' ,position: "absolute", top: 25, left: 25 }}>
          <Button type="primary" onClick={handlePreview} style={{ width: 'fit-content', fontSize: '18px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            All Routes
          </Button>
        </div>
    </div>
  );
};

export default PreviewRoutes;