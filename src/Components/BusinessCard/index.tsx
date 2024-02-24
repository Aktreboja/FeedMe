import { Business, Alias } from "../../../business"
import Image from "next/image"
import ReviewStars from "../ReviewStars"

const BusinessCard = ({business}: {business: Business}) => {
    const {name, location, phone, review_count, rating, id, price, categories, image_url} = business

    const retrieveAddress = (location: string[]) => {
        let address = ""

        for (let i = 0; i < location.length; i++) {
            address += location[i] + " "
        }
        
        return address
    }

    const retrieveCategories = (alias: Alias[]) => {
        let categories = ""
        for (let i = 0; i < alias.length; i++) {
            categories += alias[i].title + ", "
        }
        categories = categories.trim().slice(0, -1)

        return categories
    }
    

    return (
    <div className="border shadow-md cursor-pointer flex my-3 rounded-r-md h-36  hover:shadow-lg duration-100  ">
        <div className=" w-36 h-auto relative">
          {/* Company Image */}
          <Image src = {image_url} fill= {true} className="object-cover h-full" alt = {`${name} Company`}/>
        </div>
        <div className="px-3">
          <h1 className="font-bold text-xl">{name}</h1>
          <p className="font-semibold">{`${retrieveAddress(location.display_address)}`}</p>
          <p>{`${retrieveCategories(categories)}`}</p>
          
          <div className="flex items-center">
            <ReviewStars rating={rating}/>
            <p className="mt-0.5">{review_count as number} Reviews</p>
          </div>
          <p className="text-gray-500">{price}</p>
        </div>
      </div>
    )
}


export default BusinessCard