import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapCameraProps } from "@vis.gl/react-google-maps";

interface mapStateProps {
    mapCameraProps: MapCameraProps | null;
    businessCoords: google.maps.LatLngLiteral | null;
}


const initialState: mapStateProps = {
    mapCameraProps: null,
    businessCoords: null
}

const mapReducer = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapCamera: (state, action: PayloadAction<MapCameraProps>) => {
            state.mapCameraProps = action.payload
        },
        setBusinessCoords: (state, action: PayloadAction<google.maps.LatLngLiteral>) => {
            state.businessCoords = action.payload
        }
    }
})

export const getMapCameraProps = (state: RootState) => state.map.mapCameraProps
export const getBusinessCoords = (state: RootState) => state.map.businessCoords

export const { setMapCamera, setBusinessCoords } = mapReducer.actions
export default mapReducer.reducer