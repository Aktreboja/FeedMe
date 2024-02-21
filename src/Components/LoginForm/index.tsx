import Link from "next/link"
import { useState } from "react"

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("Handing login")
        const login = {
            email,
            password
        }
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        console.log("RESPONSE: ", await response.json()) 
    }

    return (
        <form className="border w-fit px-4 py-3 rounded-md flex justify-center shadow-md mx-auto bg-white">
        <div className=" w-full flex flex-col">
            <h1 className="text-center font-semibold my-2">Welcome to FeedMe!</h1>
            <p className='w-full mb-2'>Please sign-in to your account and start the adventure</p>
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
                <div>
                    <p>New to FeedMe? Sign up <Link href = "/signup">here</Link></p>
                </div>
            </div>
            <button type='button' disabled={email && password ? false : true} className=' cursor-pointer border border-gray-400 px-4 py-1 my-4 disabled' onClick = {() => handleLogin()}>Sign In</button>
        </div>
    </form>
    )
}


export default LoginForm