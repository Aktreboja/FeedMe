"use client"
import { SyntheticEvent, useCallback, useState } from "react";
import BusinessCard from "@/Components/BusinessCard";
import { Business } from "../../../business";
import Navbar from "@/Components/Navbar";
import { searchLocations } from "@/utils/Business";
import GoogleMaps from "@/Components/GoogleMap";
import { MapCameraProps, MapCameraChangedEvent } from "@vis.gl/react-google-maps";


export default function Home() {
  const [term, setTerm] = useState('')
  const [location, setLocation] = useState('')
  
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [region, setRegion] = useState()

  const [businessCoords, setBusinessCoords] = useState<google.maps.LatLngLiteral[]>([])

  
  const INITIAL_CAMERA = {
    center: {lat: 37.325095, lng: -121.942508},
    zoom: 12
  }

  const [cameraProps, setCameraProps] = useState<MapCameraProps>(INITIAL_CAMERA)


  // Navbar Search Handler
  const searchHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const searchResults = await searchLocations(term, location);
    const businesses : Business[] = searchResults.businesses
    console.log(businesses)
    setBusinesses(businesses)
    setRegion(searchResults.region)

    const businessesCoords = []
    for (let business = 0; business < businesses.length; business++) {
      const {latitude, longitude} = businesses[business].coordinates
      businessesCoords.push({lat: latitude, lng: longitude})
    }
    setBusinessCoords(businessesCoords )
    const NEW_CAMERA : MapCameraProps = {
      center: {lat: searchResults.region.center.latitude, lng: searchResults.region.center.longitude},
      zoom: cameraProps.zoom
    }
    setCameraProps(NEW_CAMERA)
  }


  const centerHandler = useCallback((ev: MapCameraChangedEvent) => {
    const newCameraProps : MapCameraProps = {
      center: ev.detail.center,
      zoom: ev.detail.zoom
    }
    setCameraProps(newCameraProps)
  }, [])



  return (
    <main className="relative flex flex-col h-screen ">
        <Navbar searchQuery={{term, location}} handlers={{ setTerm, setLocation, searchHandler }}/>
        <div className="w-full h-20"></div>
        <section className="flex border-black ">
          
          {/* Results for yelp destinations */}
          <div className="w-3/5 px-2 border h-80 mt-20">
              {
                businesses && businesses.map((business, key) => <BusinessCard key = {key} business={business}/>)
              }
          </div>
          <div className="fixed right-0 w-2/5 h-[90%] flex-1 border-black">
              <GoogleMaps cameraProps = {cameraProps} centerHandler = {centerHandler} markerCoords = {businessCoords}/>
          </div>
        </section> 
    </main>
  );
}