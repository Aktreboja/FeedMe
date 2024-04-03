import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: 'variable',
    style: ['italic', 'normal']
  })


interface InputGroupProps {
    label: string;
    inputType: string;
    placeholder: string;
}


const GettingStartedForm = () => {
    return (
        <form className="py-10  shadow-lg">
            <InputGroup label="Full Name" inputType="text" placeholder="Ex: John Doe"/>
            <InputGroup label = "User Name" inputType="text" placeholder="ex: JohnDoe4"/>
            <InputGroup label = "Email" inputType="email" placeholder="Ex: John_doe@gmail.com"/>
            <InputGroup label="Password" inputType="password" placeholder=""/>
            <div className="w-full flex justify-center mt-6">
                <button className="border-black px-6 py-2 bg-red-700 text-white rounded-md hover:bg-black">Get Started</button>
            </div>
            <br className=" text-black h-3"/>
      </form>
    )
}

// Reusable Input Group Component
const InputGroup: React.FC<InputGroupProps> = (props) => {
    const { inputType, label, placeholder } = props
    return (
    <div className='flex flex-col w-4/5 mx-auto my-2'>
        <label className = {`${montserrat.className} my-2 font-semibold sm:text-sm md:text-md`}>{label}</label>
        <input className = {`${montserrat.className} text-sm md:text-lg py-2 px-3 rounded-md border hover:shadow-md outline-slate-400  duration-75 `} type={inputType} placeholder={placeholder} />
      </div>
    )
}




export default GettingStartedForm;