'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter();

  const searchHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(
      `/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`,
    );
  };

  return (
    <form
      className=" mx-auto rounded-md flex flex-col  lg:flex-row lg:items-center"
      onSubmit={(e) => searchHandler(e)}
    >
      <input
        placeholder="Restaurant"
        className=" py-2  px-3 outline-none h-9 text-sm border my-2 lg:mx-1"
        value={term}
        onChange={(e) => setTerm(e.currentTarget.value)}
      />
      <input
        placeholder="Location"
        className=" py-2 px-3 outline-none h-9 text-sm border my-2 lg:mx-1"
        value={location}
        onChange={(e) => setLocation(e.currentTarget.value)}
      />
      <button
        disabled={term.trim() === '' || location.trim() === '' ? true : false}
        className="bg-red-800 hover:bg-red-700 duration-75 h-full  rounded-sm py-1.5 px-3  text-white font-semibold"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
