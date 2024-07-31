// MapBoxPopup.jsx
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getRiderLocations, getParcelsLocations } from '../../Utils/api';

const MapPopup = ({ onClose,selectedSubroute }) => {
  const mapContainer = useRef(null);

  const [map, setMap] = useState(null);
  const [riderLocations, setRiderLocations] = useState([]);
  const [parcelCoordinates, setParcelCoordinates] = useState([]); 
  const [srcCoordinates, setSrcCoordinates] = useState([]);
  const [destCoordinates, setDestCoordinates] = useState([]);
  const [srcName, setSrcName] = useState('0');
  const [destName, setDestName] = useState('0');
  const [polylineId, setPolylineId] = useState(null);
  const [prevPolylineId, setPrevPolylineId] = useState('0');
  const [noOfRiders, setNoOfRiders]=useState('0');
  console.log("Subroute Passed to MapBox: ", selectedSubroute);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluYWhpbGwiLCJhIjoiY2xzZzZsMDBuMWVrOTJscGN6ZHQ0cjN0ZiJ9.oID5NvKkd-ab3WdXXnhvjQ'; 
    // console.log("Subroute Id: ", selectedSubrouteId);
    const initializeMap = async () => {
      try {
        setRiderLocations(selectedSubroute.polyline.polyline); // Remove extra parenthesis
        // setPrevPolylineId(selectedLocation.data.polylineId);
        setSrcCoordinates(selectedSubroute.polyline.sourceCoordinates);
        setDestCoordinates(selectedSubroute.polyline.destinationCoordinates);
        setSrcName(selectedSubroute.polyline.source);
        setDestName(selectedSubroute.polyline.destination);
        const assigns = await getParcelsLocations();
        console.log("Parcels in Full Route: ",assigns);
        let selectedRoute = null;
        for (let i = 0; i < assigns.length; i++) {
          // Check if selectedSubrouteId matches the index number
          if (i === selectedSubroute.subroute_id) {
            selectedRoute = assigns[i];
            break;
          }
        }
        console.log("Selected Route: ",selectedRoute);
        const parcels= selectedRoute.data.parcels;
        const parcelCoords= parcels.map(parcel=> ({
            lat: parcel.location.lat,
            long: parcel.location.long
           

        }));
         console.log("Coords: ",parcelCoords);
        // //const coordinatesParcels = parcelCoords.map(parcel => [parseFloat(parcelCoords.long), parseFloat(parcelCoords.lat)]);
        setParcelCoordinates(parcelCoords);
    
        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [parcelCoords[0].long, parcelCoords[0].lat], // Initial center coordinates
          zoom: 11, // Initial zoom level
        });

        setMap(mapInstance);
      } 
      catch (error) {
        console.error('Error initializing map:', error);
      }
    };
    initializeMap();

    // Optional: Add map controls
    //  map.addControl(new mapboxgl.NavigationControl());
    
    // const intervalId = setInterval(updateRiderLocation, 10000);

    return () => {
    //   clearInterval(intervalId);
    // map.remove();
      mapboxgl.accessToken = null;
    };
  }, []);
  
  const mapPopupStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent overlay */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, /* Adjust the z-index to make sure it's on top of other elements */
  };

  const mapContainerStyle = {
    position: 'relative',
    width: '80%', /* Adjust the width as needed */
    maxWidth: '800px', /* Optional: Set a max-width for the map */
    background: '#fff',
    padding: '20px',
    borderRadius: '3px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };
  useEffect(() => {
    if (map && riderLocations.length > 0) {
        map.on('load', () => {
            try {
                //const end= new mapboxgl.Marker({ color: '#E80101' }).setLngLat([parseFloat(riderLocations[riderLocations.length-1].long), parseFloat(riderLocations[riderLocations.length-1].lat)]).addTo(map);
                const start= new mapboxgl.Marker({color: '#FD8E00'}).setLngLat([parseFloat(srcCoordinates.long), parseFloat(srcCoordinates.lat)]).addTo(map);
                const end= new mapboxgl.Marker({ color: '#E80101' }).setLngLat([parseFloat(destCoordinates.long), parseFloat(destCoordinates.lat)]).addTo(map);
               
               const popupStart = new mapboxgl.Popup({
                   offset: 25,
                   closeButton: false,
                   closeOnClick: false
               }).setLngLat([srcCoordinates.long, srcCoordinates.lat])
                 .setHTML(
                    `<p>${srcName}</p>`
                );

               const popupEnd = new mapboxgl.Popup({
                   offset: 25,
                   closeButton: false,
                   closeOnClick: false
               }).setLngLat([destCoordinates.long, destCoordinates.lat])
                 .setHTML(
                    `<p>${destName}</p>`
                 );
               // Add event listener to show popup on marker hover
                start.getElement().addEventListener('mouseenter', () => {
                   popupStart.addTo(map);
               });
           
               // Remove popup when marker is not hovered
               start.getElement().addEventListener('mouseleave', () => {
                   popupStart.remove();
               });
                // Add event listener to show popup on marker hover
                end.getElement().addEventListener('mouseenter', () => {
                   popupEnd.addTo(map);
               });
           
               // Remove popup when marker is not hovered
               end.getElement().addEventListener('mouseleave', () => {
                   popupEnd.remove();
               });
                // Calculate route
            const coordinates = riderLocations.map(r => [parseFloat(r.long), parseFloat(r.lat)]);
           
            // Add the polyline layer to the map 
            map.addLayer({
                id: 'polyline',
                type: 'line',
                source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                    },
                },
                },
                layout: {
                'line-join': 'round',
                'line-cap': 'round',
                },
                paint: {
                'line-color': '#89CFF0',
                'line-width': 8,
                },
            });
            
            parcelCoordinates.forEach((parcel) => {
              const parcelLong = parcel.long;
              const parcelLat = parcel.lat;
              map.addLayer({
                  id: `parcel-marker-${parcelLong}-${parcelLat}`,
                  type: 'circle',
                  source: {
                      type: 'geojson',
                      data: {
                          type: 'Feature',
                          geometry: {
                              type: 'Point',
                              coordinates: [parseFloat(parcelLong), parseFloat(parcelLat)]
                          }
                      }
                  },
                  paint: {
                      'circle-radius': 6,
                      'circle-color': '#3D352A',
                      'circle-opacity': 0.9
                  }
              });
          //     new mapboxgl.Marker({ color: '#FFA500', scale: 0.5 })
          //         .setLngLat([parseFloat(parcelLong), parseFloat(parcelLat)])
          //         .addTo(map);
           });
            } catch (error) {
                console.error('Error adding markers and polyline to map:', error);
            }
        });
    }
}, [map, riderLocations]);

// return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;

  return (
    <div style={mapPopupStyle}>
      <div style={mapContainerStyle}>
        <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
        <button style={closeButtonStyle} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MapPopup;