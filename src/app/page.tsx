"use client"
import { useEffect, useState } from "react";
import BusinessCard from "@/components/BusinessCard";
import { Business } from "../../business";

export default function Home() {
  const [term, setTerm] = useState('')
  const [location, setLocation] = useState('')
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const searchLocations = async () => {
    if (term && location) {
      const locationResponse = (await fetch(`/api/search?location=${location}&term=${term}`)).json();
      console.log(await locationResponse)
      setBusinesses(await locationResponse);
      
    } else {
      console.error("Error searching locations")
    }
   
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center">

      <section className="w-1/2 h-screen border border-black flex justify-center items-center">
        <div className="border border-black w-4/5 h-fit flex flex-col justify-center items-center px-3 py-2">
          <h1 className="font-bold">FeedMe</h1>
          <p>A Web application centered around sharing your favorite food and drink locations.</p>
          <div className="mt-3 flex items-end">
            <div className="mx-2">
              <p className="">Destination</p>
              <input type="text" placeholder="McDonalds" className="px-2 py-1 rounded-md border border-gray-600" value = {term} onChange = { (e) => setTerm(e.currentTarget.value)}/>
            </div>
            <div className="mx-2">
              <p>Location</p>
              <input type = "text" placeholder="San Jose, CA" className="px-2 py-1 rounded-md border border-gray-600" value={location} onChange = {(e) => setLocation(e.currentTarget.value)}/>
            </div>
            <button className="border border-black  h-fit px-3 py-1 rounded-sm hover:bg-black hover:text-white duration-100" onClick = {() => searchLocations()}>Search</button>
          </div>
        </div>
      </section>

      <section className="w-1/2 h-full overflow-y-scroll border-border-black flex justify-center">
        <div className="w-4/5 h-[500px] border">
          {
            businesses && businesses.map((business, key) => {
              return <BusinessCard business={business} key={key}/>
            })
          }
        </div>

      </section>


    </main>
  );
}