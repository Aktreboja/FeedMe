import { SearchObject, NavbarHandlers } from '../../../types';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';

import SearchForm from '../SearchForm';
import { useUser } from '@auth0/nextjs-auth0/client';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '700',
  style: ['italic'],
});

const Navbar = () => {
  const { user } = useUser();

  const [settings, setSettings] = useState(false);

  return (
    <nav className="fixed top-0 w-full border flex justify-between items-center h-20 py-3 bg-white z-50">
      <div className="flex  justify-center items-end">
        <Link href="/dashboard">
          <h1
            className={`font-bold text-2xl md:text-4xl pl-3 ${montserrat.className}`}
          >
            FeedMe
          </h1>
        </Link>

        <div className="ml-5 hidden md:flex">
          <p> Powered by </p>
          <Link href="https://www.yelp.com" target="_blank">
            <Image
              src="/yelp_logo_cmyk.png"
              alt="Yelp"
              width={70}
              height={70}
              quality={100}
              className="ml-2"
            />
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex">
        <Link href="/businesses">
          <p className="font-semibold mt-2 text-lg mx-2">Businesses</p>
        </Link>
        <Link href="/search">
          <p className="font-semibold mt-2 text-lg mx-2">Search</p>
        </Link>
        {/* <SearchForm searchHandler={searchHandler} /> */}
      </div>
      {user && user.picture && user.name && (
        <div
          className="mr-3 h-fit flex items-center cursor-pointer"
          onClick={() => setSettings(!settings)}
        >
          <p className="max-lg:hidden font-semibold mx-3 mt-1">
            {user?.name?.split(' ')[0]}
          </p>
          <div className="w-10 h-10 relative ">
            <Image
              src={user.picture}
              fill={true}
              className="rounded-full"
              alt={user.name}
            />
          </div>

          {/* Toggler to be able to log off */}
          {settings && (
            <div className="border max-lg:w-full w-52 h-fit absolute right-3 top-20 bg-white rounded-sm shadow-md">
              <Link href="/profile">
                <p className="text-center font-semibold max-lg:text-md text-lg py-2 hover:bg-gray-100 duration-100">
                  Profile
                </p>
              </Link>
              <Link href="/profile">
                <p className="text-center font-semibold max-lg:text-md text-lg py-2 hover:bg-gray-100 duration-100">
                  Settings
                </p>
              </Link>
              <Link href="/api/auth/logout">
                <p className="text-center font-semibold max-lg:text-md text-lg py-2 hover:bg-gray-100 duration-100">
                  Logout
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
