import React, { useEffect, useState } from 'react';

const loadScript = (url, callback) => {
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else if (existingScript && callback) {
    callback();
  }
};

const MapComponent = ({ setLatitude, setLongitude, setUbicacion }) => {
  const [localLatLng, setLocalLatLng] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBjprc31jsXrCivv3ck5VdI6XLRF4zKyBU&libraries=places`;
    loadScript(googleMapsApiUrl, () => {
      if (window.google) {
        initMap();
      }
    });
  }, []);

  const initMap = () => {
    const initialLatLng = { lat: -34.397, lng: 150.644 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: initialLatLng,
      zoom: 8,
    });

    map.addListener('click', (e) => {
      placeMarkerAndPanTo(e.latLng, map);
    });

    setMap(map);
  };

  const placeMarkerAndPanTo = (latLng, map) => {
    if (marker) {
      marker.setMap(null);
    }
    const newMarker = new window.google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
    setLocalLatLng({ lat: latLng.lat(), lng: latLng.lng() });
    setMarker(newMarker);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setUbicacion(results[0].formatted_address);
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  const handleSave = () => {
    if (localLatLng.lat && localLatLng.lng) {
      setLatitude(localLatLng.lat);
      setLongitude(localLatLng.lng);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <div id="map" className="w-full h-96 mb-4 rounded-lg shadow-lg"></div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={handleSave}
      >
        Guardar
      </button>
    </div>
  );
};

export default MapComponent;
