"use client"
import {useState} from 'react'
import Link from 'next/link'
import {Montserrat} from 'next/font/google'


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '600',
    style: ['normal']
})

const montserratText = Montserrat({
    subsets: ['latin'],
    weight: '400',
    style: ['normal']
})

const Signup = () => {

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [formErrors, setFormErrors] = useState({
        email: '',
        userName: '',
        fullName: '',
        password: ''
    })

    const handleSignup = async () => {
        console.log("Signing up")
        const newUser = {
            name,
            userName,
            email,
            password
        }
        console.log(newUser)
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
    }

    return (<section className="w-full min-h-screen flex justify-center items-center">
        <form className="border border-gray-400 shadow-md w-fit px-4 py-8 rounded-md flex justify-center" onSubmit={handleSignup}>
            <div className=" w-full flex flex-col ">
                <h1 className={`text-center ${montserrat.className} font-semibold`}>Welcome to FeedMe!</h1>
                <p className='w-4/5 text-center mx-auto my-2'>Please sign-in to your account and start the adventure</p>
                <div className=" flex flex-col  w-4/5 mx-auto">
                    <label className={`w-full mb-1 ${montserrat.className}`}>Full Name</label>
                    <input type="text"  required className="w-full py-2 px-2 border border-gray-400  rounded-sm mb-3" value = {name} onChange = {(e) => setName(e.currentTarget.value)} />
                </div>
                <div className="w-4/5 flex flex-col  mx-auto">
                    <label className={`w-full mb-1 ${montserrat.className}`}>User Name</label>
                    <input type="text" required className="w-full py-2 px-2 border border-gray-400  rounded-sm mb-3" value = {userName} onChange = {(e) => setUserName(e.currentTarget.value)}/>
                </div>
                <div className="w-4/5 flex flex-col mx-auto">
                    <label className={`w-full mb-1 ${montserrat.className}`}>Email</label>
                    <input type="email" placeholder="Email" required className="w-full py-2 px-2 border border-gray-400  rounded-sm mb-3" value = {email} onChange = {(e) => setEmail(e.currentTarget.value)}/>
                </div>
                <div className="w-4/5 flex flex-col mx-auto">
                    <label className={`w-full mb-1 ${montserrat.className}`}>Password</label>
                    <input type = "password" placeholder="Password" required className='w-full py-2 px-2 border border-gray-400  rounded-sm mb-3' value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
                </div>

                <button type='submit'  className={`w-4/5 mx-auto cursor-pointer border border-gray-400 px-4 py-2 my-4 disabled rounded-sm shadow-md hover:shadow-lg duration-100 ${montserrat.className}`}>Sign up</button>
            </div>
        </form>
    </section>)
} 


export default Signup