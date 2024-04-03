"use client"
import { SyntheticEvent, useCallback, useState, useEffect} from "react";
import BusinessCard from "@/Components/BusinessCard";
import { Business } from "../../../business";
import Navbar from "@/Components/Navbar";
import GoogleMaps from "@/Components/GoogleMap";
import { MapCameraProps, MapCameraChangedEvent, useMap } from "@vis.gl/react-google-maps";
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { getBusinesses } from "../features/businessReducer";
import { fetchBusinesses, getTerm, getLocation } from "../features/businessReducer";
import { getBusinessCoords, getMapCameraProps, setBusinessCoords, setMapCamera } from '../features/mapReducer'
import SearchForm from "@/Components/SearchForm";

export default function Dashboard() {
  // Redux Dispatcher initialization
  const dispatch = useAppDispatch()
  
  // State selectors from businessReducer
  const searchTerm = useAppSelector(getTerm)
  const searchLocation = useAppSelector(getLocation)
  const businesses = useAppSelector(getBusinesses)

  // State selectors from mapReducer
  const mapCameraProps = useAppSelector(getMapCameraProps)
  const businessCoords = useAppSelector(getBusinessCoords)

  // State to navigate to the user's location, as well as the general region of the search results

  const map = useMap()

  // useEffect to load the user's location, will ask for permission
  useEffect(() => {
    const retrieveCurrentLocation = () => {
      if (!navigator.geolocation) console.error("Browser is not compatible")
      else {
          navigator.geolocation.getCurrentPosition((success) => {
  
              const coords : MapCameraProps = {
                  center: {
                      lat: success.coords.latitude,
                      lng: success.coords.longitude
                  },
                  zoom: 12
              }
              dispatch(setMapCamera(coords))
          },
          (error) => {
              console.error("Error here: ", error.message)
          })
      }
  }
  retrieveCurrentLocation()
  if (!map) return
  }, [map, dispatch])


  // Navbar Search Handler for Yelp businesses
  const searchHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await dispatch(fetchBusinesses({
        term: searchTerm,
        location: searchLocation
      })).unwrap()

      const { region } = result
      const NEW_CAMERA : MapCameraProps = {
        center: {lat: region.center.latitude, lng: region.center.longitude},
        zoom: 12
      }
      dispatch(setMapCamera(NEW_CAMERA))

    } catch (error) {
      console.error("Error here: ", error)
    }
  }

  const centerHandler = useCallback((ev: MapCameraChangedEvent) => {
    const newCameraProps : MapCameraProps = {
      center: ev.detail.center,
      zoom: ev.detail.zoom
    }
    dispatch(setMapCamera(newCameraProps))
  }, [dispatch])


// onClick handler for when a business is clicked from the search results
const businessClickHandler = (business: Business) => {
  const { coordinates } = business
  const { latitude, longitude } = coordinates

  // Set the business coords and pan to the position of the business

  dispatch(
    setBusinessCoords({
      lat: latitude,
      lng: longitude
    })
  )

  if (map) {
    map.panTo({
      lat: latitude,
      lng: longitude
    })
    map.setZoom(13)
  } 
}

  return (
      <main className="relative flex flex-col h-screen ">
        <Navbar handler={{ searchHandler }}/>
        <section className="w-full h-[80vh] flex flex-grow flex-col items-center overflow-y-auto mt-3">
          {/* Results for yelp destinations */}
          <div className="mt-20 w-full  lg:hidden">
            <SearchForm searchHandler={searchHandler}/>
          </div>
          
          <div className="w-full lg:mt-20 lg:w-1/2 max-w-[800px] px-2 border mt-5 max h-[80vh] overflow-y-scroll">
            {businesses.map((business, key) => (
              <BusinessCard key={key} business={business} clickHandler={businessClickHandler} />
            ))}
          </div>
          <div className="w-full h-1/3  min-h-[300px] md:min-h-[400px] md:max-w-[800px] p-6 mx-auto mt-auto">
            {mapCameraProps && <GoogleMaps cameraProps={mapCameraProps as MapCameraProps} centerHandler={centerHandler} markerCoords={businessCoords} />}
          </div>
      </section>
    </main>
  );
}