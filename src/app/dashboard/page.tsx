'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  MapCameraProps,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import SearchForm from '@/Components/SearchForm';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useFetchUserBusinessesQuery } from '@/store/business/BusinessApiSlice';
import { Business, Coordinates } from '@/business';
import GoogleMaps from '@/Components/GoogleMap';
import Link from 'next/link';
import PieChart from '@/Components/BusinessCategoryPieChart';

export default withPageAuthRequired(
  function Dashboard() {
    const { user, error, isLoading } = useUser();

    const INITIAL_CAMERA = {
      center: { lat: 37.325095, lng: -121.942508 },
      zoom: 9,
    };

    // @ts-ignore
    const { data } = useFetchUserBusinessesQuery(user?.sub);

    const [businesses, setBusinesses] = useState<Business[]>([]);

    const [cameraProps, setCameraProps] =
      useState<MapCameraProps>(INITIAL_CAMERA);
    const [markerCoordinates, setMarkerCoordinates] =
      useState<google.maps.LatLngLiteral>();

    useEffect(() => {
      if (data) {
        let businessArray: Business[] = [];
        data.data.forEach((entry) => businessArray.push(entry.business));
        setBusinesses(businessArray);
      }
    }, [data]);

    const centerHandler = useCallback((ev: MapCameraChangedEvent) => {
      const newCameraProps: MapCameraProps = {
        center: ev.detail.center,
        zoom: ev.detail.zoom,
      };
      setCameraProps(newCameraProps);
    }, []);

    interface PieChartData {
      label: string;
      value: number;
    }

    const calculateBusinessPieChartData = (
      businesses: Business[],
    ): PieChartData[] => {
      let dataset: { [key: string]: number } = {};

      for (let i = 0; i < businesses.length; i++) {
        const categories = businesses[i].categories;
        for (let j = 0; j < categories.length; j++) {
          const categoryTitle = categories[j].title;
          if (categoryTitle in dataset) {
            dataset[categoryTitle]++;
          } else {
            dataset[categoryTitle] = 1;
          }
        }
      }

      // Convert dataset to an array of objects with 'label' and 'value' fields and sort by value in descending order
      return Object.entries(dataset)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value]) => ({ label, value }));
    };

    // console.log(calculateBusinessPieChartData(businesses))

    // const chartData = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 }];

    const labelsArray: string[] = [];
    const dataArray: number[] = [];
    calculateBusinessPieChartData(businesses)
      .slice(0, 5)
      .forEach((entry) => {
        dataArray.push(entry.value);
        labelsArray.push(entry.label);
      });

    const chartData = {
      labels: labelsArray,
      datasets: [
        {
          label: 'Favorited Businesses',
          data: dataArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
          legend: {
            position: 'right',
          },
        },
      ],
    };

    const chartOptions = {
      plugins: {
        responsive: true,
        legend: {
          position: 'right', // Position the legend on the right
        },
      },
    };

    const selectedBusinessHandler = (coordinates: Coordinates) => {
      const { latitude, longitude } = coordinates;
      setCameraProps({
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });
      setMarkerCoordinates({ lat: latitude, lng: longitude });
    };

    // Dashboard Grid Box items
    const DashboardGridBox = ({
      title,
      businesses,
      redirect,
    }: {
      title: string;
      businesses: Business[];
      redirect?: string;
    }) => {
      return (
        <div className="border p-4 w-full min-h-96 max-h-[430px] mr-1 shadow-md flex flex-col gap-1">
          <h3 className="text-2xl text-center font-semibold">{title}</h3>
          <div className="rounded-sm  border-gray-300 px-1 py-2 flex-grow">
            {businesses &&
              businesses.map((business, key) => {
                const { name, location, coordinates } = business;
                const { city, state } = location;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      selectedBusinessHandler(coordinates);
                    }}
                    className="border shadow-sm rounded-sm px-2 py-1 my-1 hover:shadow-md hover:duration-100 cursor-pointer"
                  >
                    <p className="font-semibold">{name}</p>
                    <p>
                      {city}, {state}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="h-6">
            {redirect && (
              <Link href="/businesses">
                <p className="text-right text-gray-600 cursor-pointer hover:underline">
                  View More
                </p>
              </Link>
            )}
          </div>
        </div>
      );
    };

    // todo: Create loading animations here
    if (isLoading) return <div>Loading...</div>;
    else if (user)
      return (
        <section className="w-full overflow-y-auto mt-3 h-fit">
          <div className="flex flex-col items-center w-4/5 border shadow-md mx-auto p-10">
            <h1 className="text-4xl font-bold mb-5">Welcome, {user.name}</h1>
            <div className="w-4/5  flex flex-col justify-center">
              <h3 className="font-semibold text-2xl text-center">
                Ready to begin? Search for a location below
              </h3>
              <div className="mx-auto my-4 max-lg:w-full">
                <SearchForm />
              </div>
            </div>
          </div>

          {/* Section with all of the analytics */}
          <div className="w-full mt-5">
            <div className=" grid max-lg:grid-cols-1 gap-3 grid-cols-2 max-lg:w-full w-4/5 max-w-[1400px] mx-auto mt-1 p-2">
              {/* Total Searches this week */}
              <DashboardGridBox
                title="Recently Saved Businesses"
                businesses={businesses}
                redirect="/businesses"
              />
              <div className="relative border px-3 py-2 w-full min-h-96 max-h-[430px] mr-1 shadow-md flex flex-col items-center">
                <h3 className="text-2xl text-center font-semibold">
                  Your Restaurant Categories
                </h3>
                <div className="flex-grow h-fit w-f flex py-1 justify-center items-center">
                  <PieChart data={chartData} options={chartOptions} />
                </div>
                <div className="mt-1 h-6 w-full">
                  <Link href="/businesses">
                    <p className="text-right  text-gray-600 cursor-pointer hover:underline">
                      View Businesses
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="max-lg:w-full w-4/5 max-w-[1400px] h-[425px] mx-auto mt-5 ">
            <GoogleMaps
              cameraProps={cameraProps}
              markerCoords={markerCoordinates}
              centerHandler={centerHandler}
            />
          </div>
        </section>
      );
  },
  {
    returnTo: '/dashboard',
  },
);
