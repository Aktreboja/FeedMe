import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Business } from "../../../business";
import { searchLocations } from "@/utils/Business";
import { RootState } from "@/store";
import { BusinessResponse } from "@/utils/Business";

interface BusinessStateProps {
    searchTerm: string;
    searchLocation: string;
    businesses: Business[];
    filteredBusiness: Business[];

}

const initialState : BusinessStateProps = {
    searchTerm: '',
    searchLocation: '',
    businesses: [],
    filteredBusiness: [],
}

export const fetchBusinesses = createAsyncThunk(
    'businesses/fetchBusinesses',
    async (payload : { term: string, location: string }, thunkApi) => {
        const { term, location } = payload;
        const response = await searchLocations(term, location)
        return response
    }
)


// Reducer initialization
const businessReducer = createSlice({
    name: 'businesses',
     initialState,
     reducers: {
        filterBusinesses: (state, action: PayloadAction<Business[]>) => {
            if (state.businesses.length == 0) state
            else {
                // state.businesses.filter(())
            }
        },
        setSearchterm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
        setSearchLocation: (state, action: PayloadAction<string>) => {
            state.searchLocation = action.payload
        }
     },
     extraReducers: (builder) => {
         builder.addCase(fetchBusinesses.fulfilled, (state, action : PayloadAction<BusinessResponse>) => {
            state.businesses = action.payload.businesses
         })
     },
})

// Selectors for business Reducer

export const getTerm = (state: RootState) => state.business.searchTerm
export const getLocation = (state: RootState) => state.business.searchLocation
export const getBusinesses = (state: RootState) => state.business.businesses


export const {filterBusinesses, setSearchLocation, setSearchterm } = businessReducer.actions 
export default businessReducer.reducer