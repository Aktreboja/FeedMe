import {
  APIProvider,
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useCallback, useState, useMemo } from 'react';

interface GoogleMapsProps {
  cameraProps: MapCameraProps;
  centerHandler: (ev: MapCameraChangedEvent) => void;
  markerCoords?: google.maps.LatLngLiteral | null;
}

const GoogleMaps = ({
  cameraProps,
  centerHandler,
  markerCoords,
}: GoogleMapsProps) => {
  const cameraOptions = useMemo(
    () => ({ center: cameraProps.center, zoom: cameraProps.zoom }),
    [cameraProps],
  );
  return (
    <Map
      {...cameraOptions}
      mapId={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}`}
      onCenterChanged={centerHandler}
      onZoomChanged={centerHandler}
    >
      {/* <AdvancedMarker  position = {defaultPosition}/> */}
      {markerCoords && <AdvancedMarker position={markerCoords} />}
    </Map>
  );
};
export default GoogleMaps;
