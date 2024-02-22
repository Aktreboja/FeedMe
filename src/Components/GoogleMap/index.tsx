import {APIProvider, AdvancedMarker, Map, MapCameraChangedEvent, MapCameraProps, Marker} from '@vis.gl/react-google-maps';
import { useCallback, useState, useMemo } from 'react';

const GoogleMaps =  ({cameraProps, centerHandler} : { cameraProps: MapCameraProps, centerHandler: (centerHandler: google.maps.LatLngLiteral) => void }) => {

    const cameraOptions = useMemo(() => ({center: cameraProps.center, zoom: cameraProps.zoom}), [cameraProps])

    return (
        <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
            <Map  {...cameraOptions} mapId={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}`} >
                {/* <AdvancedMarker  position = {defaultPosition}/> */}
                
            </Map>
        </APIProvider>
    )

 
}


export default GoogleMaps