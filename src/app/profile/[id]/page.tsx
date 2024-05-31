'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

const Profile = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { user, isLoading } = useUser();
  console.log('user: ', user);
  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="mt-4  w-fit flex flex-col items-center h-fit">
        {user && user.picture ? (
          <div className="w-32 h-32 relative rounded-full shadow-md">
            <Image
              src={user.picture}
              alt={user.name}
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
      </div>

      <div className="flex my-4 font-semibold">
        <p className="text-xl px-4">History</p>
        <p className="text-xl px-4">Collections</p>
        <p className="text-xl px-4">History</p>
      </div>

      <div className="grid max-md:grid-cols-1 grid-cols-2 w-full">
        <div className="border w-4/5 h-20"></div>
      </div>
    </section>
  );
};

export default Profile;
