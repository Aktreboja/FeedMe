'use client';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import {
  useFetchUserBusinessesQuery,
  useDeleteBusinessMutation,
} from '@/store/business/BusinessApiSlice';
import { Business } from '@/business';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { FaRegTrashAlt } from 'react-icons/fa';

export default withPageAuthRequired(
  function Businesses() {
    const { user, error, isLoading } = useUser();

    const { data } = useFetchUserBusinessesQuery(user?.sub as string);
    const [deleteBusiness] = useDeleteBusinessMutation();

    const [businesses, setBusinesses] = useState<Business[]>([]);

    // Table Filters
    const [states, setStates] = useState<string[]>([]);
    const [prices, setPrices] = useState<string[]>([]);

    const [filter, setFilter] = useState('');

    // Deleting state
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState('');

    const [tableSettings, setTableSettings] = useState({
      name: 'ASCENDING',
      city: '',
      rating: '',
    });

    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Use Effects
     */

    useEffect(() => {
      if (data) {
        let businessArray: Business[] = [];
        let statesSet = new Set<string>();
        let pricesSet = new Set<string>();
        data.data.forEach((entry) => {
          const business = entry.business;
          businessArray.push(business);
          statesSet.add(business.location.state.toString());
          if (business.price) pricesSet.add(business.price.toString());
          else pricesSet.add('$');
        });
        setBusinesses(businessArray);
        setStates(Array.from(statesSet));
        setPrices(Array.from(pricesSet));
      }
    }, [data]);

    const BusinessRow = ({ business }: { business: Business }) => {
      const { name, rating, location, id, price } = business;
      return (
        <tr className="">
          <td className="py-5 px-4 border-b whitespace-nowrap font-medium">
            {name}
          </td>
          <td className="py-5 px-4 border-b whitespace-nowrap">
            {location.city}
          </td>
          <td className="py-5 px-4 border-b whitespace-nowrap">
            {location.state}
          </td>
          <td className="py-5 px-4 border-b whitespace-nowrap">
            {rating.toString()}
          </td>
          <td className="py-5 px-4 border-b whitespace-nowrap">
            {price ? price : '$'}
          </td>
          <td className="border-b px-4">
            <FaRegTrashAlt
              className="cursor-pointer"
              onClick={() => promptBusinessDeletion(id)}
            />
          </td>
        </tr>
      );
    };

    const ToggleTableHeader = ({
      name,
      setting,
      toggleHandler,
    }: {
      name: string;
      setting: string;
      toggleHandler: any;
    }) => {
      return (
        <th className="py-2 px-4 text-white text-left flex h-full">
          <div className="flex items-center">
            <p>Name</p>
            {setting === '' ? null : setting == 'DESCENDING' ? (
              <div className="ml-1">
                <RiArrowDownSFill />
              </div>
            ) : (
              <div className="ml-1 mt-2 cursor-pointer" onClick={() => {}}>
                <RiArrowUpSFill />
              </div>
            )}
          </div>
        </th>
      );
    };

    // Handlers

    const promptBusinessDeletion = (id: String) => {
      setSelectedBusiness(id.toString());
      setIsDeleting(true);
    };

    const handleBusinessDeletion = async () => {
      await deleteBusiness(selectedBusiness);
      setIsDeleting(false);
    };

    return (
      <section className="flex h-full justify-center items-center flex-col ">
        {isDeleting && (
          <section className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white px-3 py-4 rounded-md">
              <p>Would you like to remove this business?</p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsDeleting(false);
                  }}
                  className="px-3 border py-1 rounded-md hover:bg-gray-100 duration-75"
                >
                  Cancel
                </button>
                <button
                  className="px-3 border py-1 rounded-md bg-red-700 text-white font-semibold hover:bg-red-800 duration-75"
                  onClick={() => {
                    handleBusinessDeletion();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="max-lg:w-full  lg:w-2/3 border max-w-[1000px] ">
          <div className="w-full flex gap-3 justify-center px-3 py-2 shadow-md">
            <div className="w-1/3">
              <p className="font-medium">State</p>
              <select className="border rounded-sm px-2 py-2 w-full">
                <option className="text-gray-200">Select a State</option>
                {states.map((state, key) => {
                  return (
                    <option key={key} value={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="w-1/3">
              <p className="font-medium">Rating</p>
              <select className="border rounded-sm px-2 py-2 w-full">
                <option selected>Select a rating</option>
                <option value="Top Rated">Top Rated</option>
                <option value="">Worst Rated</option>
              </select>
            </div>

            <div className="w-1/3">
              <p className="font-medium">Price</p>
              <select className="border rounded-sm px-2 py-2 w-full">
                <option selected className="text-gray-200">
                  Select a Price
                </option>
                {prices.map((price, key) => {
                  return <option key={key}>{price}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className=" max-lg:w-full lg:w-2/3 border max-w-[1000px] overflow-x-auto">
          <table className="bg-white shadow-md w-full">
            <thead className="bg-gray-800 h-12">
              <tr>
                <ToggleTableHeader
                  name="Name"
                  setting={tableSettings.name}
                  toggleHandler={setTableSettings}
                />
                <th scope="col" className="py-2 px-4 text-left text-white">
                  City
                </th>
                <th scope="col" className="py-2 px-4 text-left text-white">
                  State
                </th>
                <th scope="col" className="py-2 px-4 text-left text-white">
                  Rating
                </th>
                <th scope="col" className="py-2 px-4 text-left text-white">
                  Price
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {businesses &&
                businesses.map((entry, key) => {
                  return <BusinessRow key={key} business={entry} />;
                })}
            </tbody>
          </table>
        </div>

        {/* Page handler */}
        <div className="flex mt-3">
          <p>Page</p>
          <input
            className="border border-gray-400 w-8 mx-2 text-center rounded-sm"
            value={currentPage}
          />
          <p> of {Math.ceil(businesses.length / 10)}</p>
        </div>
      </section>
    );
  },
  {
    returnTo: '/businesses',
  },
);
