'use client';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import { useFetchUserBusinessesQuery } from '@/store/business/BusinessApiSlice';
import { Business } from '@/business';
import { MdArrowDropDown } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

export default withPageAuthRequired(
  function Businesses() {
    const { user, error, isLoading } = useUser();

    const { data } = useFetchUserBusinessesQuery(user?.sub as string);

    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [tableSettings, setTableSettings] = useState({
      name: 'ASCENDING',
      city: '',
      rating: '',
    });

    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
      if (data) {
        let businessArray: Business[] = [];
        data.data.forEach((entry) => businessArray.push(entry.business));
        setBusinesses(businessArray);
      }
    }, [data]);

    const BusinessRow = ({ business }: { business: Business }) => {
      const { name, rating, location } = business;
      return (
        <tr>
          <td className="py-2 px-4 border-b font-semibold ">{name}</td>
          <td className="py-2 px-4 border-b">{location.city}</td>
          <td className="py-2 px-4 border-b">{location.state}</td>
          <td className="py-2 px-4 border-b">{rating.toString()}</td>
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
        <th className="py-2 px-4 border-b text-left flex">
          <div className="flex items-center">
            <p>Name</p>
            {setting === '' ? null : setting == 'DESCENDING' ? (
              <div className="ml-1">
                <RiArrowDownSFill />
              </div>
            ) : (
              <div className="ml-1">
                <RiArrowUpSFill />
              </div>
            )}
          </div>
        </th>
      );
    };

    return (
      <section className="flex h-full justify-center items-center flex-col">
        <table className="w-1/2 bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <ToggleTableHeader
                name="Name"
                setting={tableSettings.name}
                toggleHandler={setTableSettings}
              />
              <th className="py-2 px-4 border-b text-left">City</th>
              <th className="py-2 px-4 border-b text-left">State</th>
              <th className="py-2 px-4 border-b text-left">Rating</th>
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
        {/* Page handler */}
        <div className="flex mt-3">
          <p>Page</p>
          <input className="border w-8 mx-2 text-center rounded-sm" />
          <p> of {}</p>
        </div>
      </section>
    );
  },
  {
    returnTo: '/businesses',
  },
);
