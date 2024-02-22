import { SearchObject, NavbarHandlers } from "../../../types"

const Navbar = ({ searchQuery, handlers }: { searchQuery: SearchObject, handlers:  NavbarHandlers}) => {

    const {term, location} = searchQuery
    const {setTerm, setLocation, searchHandler} = handlers

    return (
        <nav className="fixed top-0 w-full border flex justify-between items-center h-20 py-3 bg-white z-50">
            <div className="">
                <h1 className="font-bold text-3xl ">FeedMe</h1>
            </div>
            <form className=" shadow-lg rounded-md">
                <input placeholder="Restaurant" className=" py-2 px-3 outline-none " value = {term} onChange = {(e) => setTerm(e.currentTarget.value)}/>
                <span className="w-1 bg-black border"></span>
                <input placeholder ="Location" className=" py-2 px-3 outline-none" value = {location} onChange = {(e) => setLocation(e.currentTarget.value)}/>
                <button disabled = {term.trim() === '' || location.trim() === '' ? true : false } className="bg-red-800 hover:bg-red-700 duration-75 h-full py-2 px-3 rounded-r-md text-white font-semibold" onClick = {() => searchHandler()} type="button">Search</button>
            </form>
            <div className="mr-3 border h-fit">
                <p className="font-semibold">Profile</p>
                
            </div>
        </nav>
    )
}

export default Navbar