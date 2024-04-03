import { useAppSelector, useAppDispatch } from "@/app/features/hooks";
import { getLocation, getTerm, setSearchterm, setSearchLocation } from "@/app/features/businessReducer";
import { SyntheticEvent } from "react";

const SearchForm = ({ searchHandler }: {searchHandler: (event: SyntheticEvent) => Promise<void> }) => {
    const dispatch = useAppDispatch();

    const searchTerm = useAppSelector(getTerm)
    const searchLocation = useAppSelector(getLocation)

    return (
    <form className=" w-4/5  mx-auto rounded-md flex flex-col lg:flex-row lg:items-center" onSubmit={(e) => searchHandler(e)}>
        <input placeholder="Restaurant" className=" py-2 px-3 outline-none h-9 text-sm border my-2 lg:mx-1" value = { searchTerm } onChange = {(e) => dispatch(setSearchterm(e.currentTarget.value))}/>
        <input placeholder ="Location" className=" py-2 px-3 outline-none h-9 text-sm border my-2 lg:mx-1" value = {searchLocation} onChange = {(e) => dispatch(setSearchLocation(e.currentTarget.value))}/>
        <button disabled = {searchTerm.trim() === '' || searchLocation.trim() === '' ? true : false } className="bg-red-800 hover:bg-red-700 duration-75 h-full  rounded-sm py-1.5 px-3  text-white font-semibold"  type="submit">Search</button>
    </form>
    )
}


export default SearchForm;