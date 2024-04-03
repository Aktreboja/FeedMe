import { SearchObject, NavbarHandlers } from "../../../types"
import Image from "next/image"
import {Montserrat} from 'next/font/google' 
import Link from "next/link"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "@/app/features/hooks"
import { setSearchLocation, setSearchterm } from "@/app/features/businessReducer"
import { RootState } from "@/store"
import SearchForm from "../SearchForm"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '700',
    style: ['italic']
})

const Navbar = ({ handler }: { handler:  NavbarHandlers}) => {

    // State selectors from Redux Store
    const searchTerm = useAppSelector((state: RootState) => state.business.searchTerm)
    const searchLocation = useAppSelector((state: RootState) => state.business.searchLocation)
    // Redux Dispatcher initialization
    const dispatch = useAppDispatch()
    const { searchHandler } = handler

    return (
        <nav className="fixed top-0 w-full border flex justify-between items-center h-20 py-3 bg-white z-50">
            <div className="flex  justify-center items-end">
                <h1 className={`font-bold text-2xl md:text-4xl pl-3 ${montserrat.className}`}>FeedMe</h1>
                <div className="ml-5 hidden md:flex">
                    <p> Powered by </p>
                    <Link 
                        href = "https://www.yelp.com" 
                        target="_blank">
                            <Image 
                                src = "/yelp_logo_cmyk.png" 
                                alt = "Yelp" 
                                width={70} 
                                height={70} 
                                quality={100} 
                                className="ml-2"/>
                    </Link>
                </div>
            </div>
            <div className="hidden lg:block">
                <SearchForm searchHandler={searchHandler}/>
            </div>
            
            <div className="mr-3  h-fit">
                <p className="font-semibold"></p>
                <span>
                    
                </span>
            </div>
        </nav>
    )
}

export default Navbar