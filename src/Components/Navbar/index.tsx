import { SearchObject, NavbarHandlers } from "../../../types"
import Image from "next/image"
import {Montserrat} from 'next/font/google' 
import Link from "next/link"
import { useState } from "react"


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '700',
    style: ['italic']
})

const Navbar = ({ searchQuery, handlers }: { searchQuery: SearchObject, handlers:  NavbarHandlers}) => {

    const {term, location} = searchQuery
    const {setTerm, setLocation, searchHandler} = handlers

    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 w-full border flex justify-between items-center h-20 py-3 bg-white z-50">
            <div className="flex  justify-center items-end">
                <h1 className={`font-bold text-4xl pl-3 ${montserrat.className}`}>FeedMe</h1>
                <div className="flex ml-5 ">
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
            <form className=" shadow-lg rounded-md hidden lg:block" onSubmit={(e) => searchHandler(e)}>
                <input placeholder="Restaurant" className=" py-2 px-3 outline-none " value = {term} onChange = {(e) => setTerm(e.currentTarget.value)}/>
                <span className="w-1 bg-black border"></span>
                <input placeholder ="Location" className=" py-2 px-3 outline-none" value = {location} onChange = {(e) => setLocation(e.currentTarget.value)}/>
                <button  disabled = {term.trim() === '' || location.trim() === '' ? true : false } className="bg-red-800 hover:bg-red-700 duration-75 h-full py-2 px-3 rounded-r-md text-white font-semibold"  type="submit">Search</button>
            </form>
            <div className="mr-3 border h-fit">
                <p className="font-semibold">Profile</p>
                <span>
                    
                </span>
            </div>
        </nav>
    )
}

export default Navbar