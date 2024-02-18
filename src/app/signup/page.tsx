"use client"
import {useState} from 'react'
import Link from 'next/link'

const Signup = () => {

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSignup = async () => {
        console.log("Signing up")
        const newUser = {
            name,
            userName,
            email,
            password
        }
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
    }

    return (<section className="w-full min-h-screen flex justify-center items-center">
        <form className="border border-black w-fit px-4 py-3 rounded-md flex justify-center">
            <div className=" w-full flex flex-col">
                <h1 className="text-center font-semibold">Welcome to FeedMe!</h1>
                <p className='w-4/5'>Please sign-in to your account and start the adventure</p>
                <div className=" flex flex-col">
                    <input type="text" placeholder="Full Name" required className="py-1 px-2 my-1 border border-gray-400 rounded-sm" value = {name} onChange = {(e) => setName(e.currentTarget.value)}/>
                </div>
                <div className=" flex flex-col">
                    <input type="text" placeholder="User Name" required className="py-1 px-2 my-1 border border-gray-400 rounded-sm" value = {userName} onChange = {(e) => setUserName(e.currentTarget.value)}/>
                </div>
                <div className=" flex flex-col">
                    <input type="email" placeholder="Email" required className="py-1 px-2 my-1 border border-gray-400 rounded-sm" value = {email} onChange = {(e) => setEmail(e.currentTarget.value)}/>
                </div>
                <div className="flex flex-col">
                    <input type = "password" placeholder="Password" required className='py-1 px-2 my-1 border border-gray-400 rounded-sm' value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
                </div>
                <div className=' flex justify-between my-1'>
                    <div className='inline-flex'>
                        <input type = "checkbox" />
                        <p className='mx-1'>Remember Me</p>
                    </div>

                </div>
                <button type='button'  className=' cursor-pointer border border-gray-400 px-4 py-1 my-4 disabled' onClick = {() => handleSignup()}>Sign up</button>
            </div>
        </form>
    </section>)
} 


export default Signup