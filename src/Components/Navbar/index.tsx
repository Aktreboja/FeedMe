

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full border border-black flex justify-between items-center py-3">
            <div className="">
                <h1 className="font-bold text-3xl ">FeedMe</h1>
            </div>
            <div className="mr-3 border h-fit">
                <p className="font-semibold">Profile</p>
                
            </div>
        </nav>
    )
}


export default Navbar