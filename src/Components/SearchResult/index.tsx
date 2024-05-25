import Image from 'next/image';
import { formatPhoneNumber } from '@/utils';
import { Business } from '@/business';
import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const SearchResult = ({
  business,
  mapHandler,
}: {
  business: Business;
  mapHandler: (lat: number, lng: number) => void;
}) => {
  const {
    name,
    location,
    review_count,
    phone,
    image_url,
    alias,
    coordinates,
    url,
    rating,
  } = business;
  const { latitude, longitude } = coordinates;

  const { user, isLoading } = useUser();

  const [clicked, setClicked] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    setClicked(!clicked);
    mapHandler(latitude, longitude);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (clicked) {
        contentRef.current.style.height = `45px`;
      } else {
        contentRef.current.style.height = '0px';
      }
    }
  }, [clicked]);

  const addBusinessHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const body = {
      user: user?.sub,
      business: business,
      timestamp: new Date(),
    };

    const response = await fetch('/api/v1/business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setClicked(false);
  };

  // Calculate the review rating of the
  const calculateReviewImage = (review: number) => {
    // Check if it is a whole number, if so return
    if (review % 1 == 0) return `/yelp/Review_Ribbon_medium_20_${review}.png`;
    else if (review >= Math.floor(review) + 0.5) {
      return `/yelp/Review_Ribbon_medium_20_${Math.floor(review)}_half.png`;
    } else {
      return `/yelp/Review_Ribbon_medium_20_${Math.floor(review)}.png`;
    }
  };

  return (
    <div
      className="px-3 py-5 border bg-white hover:bg-gray-100 duration-100 h-fit cursor-pointer "
      onClick={clickHandler}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p>{location.address1}</p>
          <div className="mt-1">
            <div className="flex w-full">
              <Image
                src={calculateReviewImage(rating.valueOf())}
                width={100}
                height={100}
                alt="Review"
                className="w-fit h-auto object-contain"
              />
              <p className="ml-3">({rating.toString()})</p>
            </div>

            <p className="text-sm mt-1 text-gray-600">
              {' '}
              Based on {review_count} Reviews
            </p>
          </div>
        </div>
        <div className="border relative w-1/3 ">
          <Image
            src={image_url}
            fill={true}
            className="object-cover"
            alt={`${alias}`}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-height duration-300 ease-in-out flex items-center justify-between mt-2 -mb-2`}
        style={{ height: '0px' }}
      >
        {/* <Link href={url.toString()} target="_blank" ><button className="mx-2 border px-3 py-2 rounded-sm bg-red-700 text-white font-semibold">View on Yelp</button></Link> */}
        <button
          className="mx-2 border px-3 py-2 font-semibold text-white bg-red-700 hover:bg-red-900 duration-100 hover:shadow-lg"
          onClick={(e) => addBusinessHandler(e)}
        >
          Add
        </button>
        <Link
          href={url.toString()}
          target="_blank"
          className="w-24 px-2 py-3  cursor-pointer"
        >
          <Image
            src="/yelp_logo_cmyk.png"
            width={100}
            height={100}
            alt="Yelp"
          />
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
