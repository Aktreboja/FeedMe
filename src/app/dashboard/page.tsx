"use client"
import { useCallback, useState } from "react";
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

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>()
  const [businessCoords, setBusinessCoords] = useState<google.maps.LatLngLiteral[]>([])

  
  const INITIAL_CAMERA = {
    center: {lat: 37.325095, lng: -121.942508},
    zoom: 12
  }

  const [cameraProps, setCameraProps] = useState<MapCameraProps>(INITIAL_CAMERA)

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
      console.log("Camera Changed: ", ev.detail);
      // setCameraProps(ev.detail)
  }, [])


  const searchHandler = async () => {
    const searchResults = await searchLocations(term, location);
    console.log(searchResults)
    setBusinesses(searchResults.businesses)
    setRegion(searchResults.region)

    

    const NEW_CAMERA : MapCameraProps = {
      center: {lat: searchResults.region.center.latitude, lng: searchResults.region.center.longitude},
      zoom: 11
    }


    console.log(NEW_CAMERA)
    setCameraProps(NEW_CAMERA)
  }

  const handleCenterChange = (newCenter: google.maps.LatLngLiteral) => {
    setCameraProps({
      center: newCenter,
      zoom: cameraProps.zoom
    });
  };



  return (
    <main className="relative flex flex-col h-screen ">
        <Navbar searchQuery={{term, location}} handlers={{ setTerm, setLocation, searchHandler }}/>
        <div className="w-full h-20"></div>
        <section className="flex border-black ">
          
          {/* Results for yelp destinations */}
          <div className="w-3/5 px-2 border mt-20">
              {
                businesses && businesses.map((business, key) => <BusinessCard key = {key} business={business}/>)
              }
          </div>
          <div className="fixed right-0 w-2/5 h-screen flex-1 border-black">
              <GoogleMaps cameraProps = {cameraProps} centerHandler = {handleCenterChange} />
          </div>
        </section> 
    </main>
  );
}