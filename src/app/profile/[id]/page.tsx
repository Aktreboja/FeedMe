'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useFetchUserBusinessesQuery } from '@/store/business/BusinessApiSlice';
import Image from 'next/image';
import GoogleMaps from '@/Components/GoogleMap';
import { useEffect, useState } from 'react';
import { Business } from '@/business';

const Profile = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { user, isLoading } = useUser();
  const { data, isFetching } = useFetchUserBusinessesQuery(user?.sub as string);

  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (data) {
      const businesses = data.data;
      let businessArray: Business[] = [];
      businesses.forEach((business) => businessArray.push(business.business));
      setBusinesses(businessArray);
      console.log(data);
    }
  }, [data]);

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="mt-4  w-fit flex flex-col items-center h-fit">
        {user && user.picture ? (
          <div className="w-32 h-32 relative rounded-full shadow-md">
            <Image
              src={user.picture}
              alt={user.name as string}
              fill
              className="object-fill rounded-full"
              quality={100}
            />
          </div>
        ) : (
          <div className="w-48 h-48  rounded-full"></div>
        )}

        <p className="text-2xl font-semibold mt-3">@{id}</p>
        <p className="text-lg">Aldrich Reboja</p>
        {/* <div className='border px-5 py-1 rounded-md border-gray-300 mt-2 cursor'>Follow</div> */}
      </div>

      <div className="flex my-4 font-semibold">
        <p className="text-xl px-4">History</p>
      </div>

      <div className="grid max-md:grid-cols-1  w-1/2 max-w-[1000px] border h-[600px] gap-5 px-5">
        <div className="border w-full h-full flex flex-col">
          {businesses &&
            businesses.map((business, key) => {
              const { name, location, coordinates, price, image_url } =
                business;
              const { city, state } = location;
              return (
                <div
                  key={key}
                  onClick={() => {
                    // selectedBusinessHandler(coordinates);
                  }}
                  className="border shadow-sm rounded-sm  px-2 py-1 my-1 hover:shadow-md hover:duration-100 cursor-pointer"
                >
                  <p className="font-semibold text-xl">{name}</p>
                  <p>
                    {city}, {state}
                  </p>
                  <p>{price}</p>
                </div>
              );
            })}
        </div>
        <div className="w-full h-full border">{/* <GoogleMaps /> */}</div>
      </div>
    </section>
  );
};

export default Profile;
