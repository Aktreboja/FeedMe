import { Business, Alias } from "../../../business"
import Image from "next/image"
import ReviewStars from "../ReviewStars"
import { Dispatch, SetStateAction } from "react"

const BusinessCard = ({
  business, 
  clickHandler
}: {
  business: Business,
  clickHandler: (business: Business) => void
}) => {
    const {name, location, phone, review_count, rating, id, price, categories, image_url, coordinates } = business

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
<div className="border w-[95%] md:w-full max-w-[1100px] mx-auto  shadow-md cursor-pointer flex my-3 rounded-r-md h-36  hover:shadow-lg duration-100 " onClick={() => clickHandler(business)}>
    <div className="w-36 min-w-[144px] border h-auto relative p-2">
        {/* Company Image */}
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Image
                src={image_url}
                fill={true}
                className="object-cover w-full h-full"
                alt={`${name} Company`}
                sizes="(max-width: 144px) 100vw"
                quality={10}
            />
        </div>
    </div>
    <div className="px-3">
        <h1 className="font-bold text-md md:text-xl mt-2">{name}</h1>
        <p className="font-semibold text-sm md:text-md text-ellipsis ">{`${retrieveAddress(location.display_address)}`}</p>
        <p className="text-sm md:text-md">{`${retrieveCategories(categories)}`}</p>

        <div className="flex flex-col">
            <ReviewStars rating={rating} />
            <p className="mt-0.5 hidden md:block">{review_count as number} Reviews</p>
        </div>
        {/* <p className="text-gray-500">{price}</p> */}
    </div>
</div>

    )
}


export default BusinessCard