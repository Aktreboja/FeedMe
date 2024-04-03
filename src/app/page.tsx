"use client"
import Link from 'next/link';
import {Montserrat} from 'next/font/google'
import Image from "next/image";
import GettingStartedForm from '@/Components/GettingStartedForm';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: 'variable',
  style: ['italic', 'normal']
})

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="my-4">
        <h1 className={`${montserrat.className} text-7xl font-bold`}>FeedMe</h1>
        <p>Powered by Yelp</p>
      </div>
      <section className="w-1/2 min-w-[400px] max-w-[600px] flex sm:flex-col sm:text-center py-3 px-1  bg-white ">
        <div >
          <h5 className={`${montserrat.className} text-xl font-bold text-center h-fit`}>What is FeedMe</h5> 
          <div className="px-2 mx-2 my-3">
            <h4 className={`${montserrat.className} font-semibold text-center`}>A business and influencer sharing platform</h4>
            <p className="w-4/5 mx-auto my-4">FeedMe provides users with a simplified method storing and sharing their favorite locations.</p>
          </div>

          <div className=" px-2 mx-2">
            <h4 className={`${montserrat.className} font-semibold text-center `}>A mix of Yelp and Linktree</h4>
            <p className="w-4/5 mx-auto my-4">Powered by Yelp, FeedMe provides up-to-date and accurate business data, allowing our users to save and share their favorite locations</p>
          </div>
          <div className='px-2 mx-2'>
            <h4 className={`${montserrat.className} font-semibold text-center`}>A Quick Note</h4>
            <p className="w-4/5 mx-auto my-4">FeedMe is still a work in progress, but for now you can sample some of its core features, <strong><u>continue by clicking the button below.</u></strong></p>
          </div>
        </div>
        {/* <div className="relative min-h-full flex-1 w-1/3">
          
          <Image 
            src="/in_n_out.jpg"
            alt = "In n Out"
            fill
            className="object-contain"/>
        </div> */}
      </section>
      <Link href = "/dashboard">
        {/* <h1 className={`${montserrat.className} font-bold italic text-4xl my-6`}>Get Started</h1> */}
        <h1 className={`${montserrat.className} font-bold italic text-4xl my-6 py-2 px-4 border bg-red-700 rounded-md text-white hover:bg-black`}>Get Started</h1>
      </Link>

      <section className="w-full sm:w-2/3 lg:1/2 max-w-[1200px]">
        {/* <div className='w-4/5 mx-auto max-w-[600px]'>
          <GettingStartedForm />
        </div>   */}
      </section>
      <Footer />
    </main>
  );
}



const Footer = () => {
  return (
    <footer className='mt-20 mb-7 px-5'>
    <div className='flex items-end '>
      <h1 className={`${montserrat.className} italic font-bold text-3xl mr-5 border-r-2 pr-4 border-gray-400`}>FeedMe </h1> <p className=''>Designed and Built by <Link href = "https://www.github.com/aktreboja" target='_blank' rel='noopener noreferrer'>Aldrich Reboja</Link></p>
    </div>
  </footer>
  )
}