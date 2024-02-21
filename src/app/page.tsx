"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Business } from "../../business";
import Link from "next/link";

import LoginForm from "@/Components/LoginForm";

export default function Home() {



  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <section className="xl:w-2/3 h-screen  relative max-w-[1500px] bg-gray-900">
        {/* <Image 
          src = {`/ramen.jpg`} 
          alt = "AT"
          fill = {true}
          className="object-cover "
          quality={75}
          /> */}
      </section>
      <section className="w-1/3 border bg-gray-200 h-screen flex justify-center items-center">
        {/* Get Started  */}
        <div className="w-4/5 h-fit  py-4">
          <LoginForm />
        </div>
      </section>



    </main>
  );
}