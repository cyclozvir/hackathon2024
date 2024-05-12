import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 50.402,
  lng: 30.533
};

function Map({ onMapChange }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDep7r093sEV6I-E9qHhFsu9jN525OqySc"
  });

  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMapDoubleClick = React.useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    onMapChange({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDblClick={onMapDoubleClick}
      options={{ disableDoubleClickZoom: true }}
      
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
