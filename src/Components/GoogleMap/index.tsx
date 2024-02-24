import {APIProvider, AdvancedMarker, Map, MapCameraChangedEvent, MapCameraProps, Pin , InfoWindow} from '@vis.gl/react-google-maps';
import { useCallback, useState, useMemo } from 'react';

interface GoogleMapsProps {
    cameraProps: MapCameraProps;
    centerHandler: (ev: MapCameraChangedEvent) => void
    markerCoords: google.maps.LatLngLiteral[]
}

const GoogleMaps =  ({cameraProps, centerHandler, markerCoords} : GoogleMapsProps) => {
    const cameraOptions = useMemo(() => ({center: cameraProps.center, zoom: cameraProps.zoom}), [cameraProps])

    return (
        <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
            <Map 
                {...cameraOptions} 
                mapId={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}`} 
                onCenterChanged={centerHandler} 
                onZoomChanged={centerHandler}
                gestureHandling={'greedy'}>
                {/* <AdvancedMarker  position = {defaultPosition}/> */}
                {markerCoords.length > 0 && markerCoords.map((coord, key) => <AdvancedMarker key = {key} position = {coord} >
                    {/* <Pin
                        background={'#22ccff'}
                        borderColor={'#1e89a1'}
                        glyphColor={'#0f677a'}
                        >
                    </Pin> */}
                </AdvancedMarker>)}
            </Map>
        </APIProvider>
    )

 
}


export default GoogleMaps