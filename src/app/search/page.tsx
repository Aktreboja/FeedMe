'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '@/Components/Navbar';
import GoogleMaps from '@/Components/GoogleMap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { ApiResponse } from '../../../types';
import { BusinessResponse } from '@/utils/Business';
import { Business } from '../../../types/business';
import Image from 'next/image';
import {
  MapCameraProps,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { formatPhoneNumber } from '@/utils';
import SearchResult from '@/Components/SearchResult';

export default withPageAuthRequired(
  function SearchResults() {
    const searchParams = useSearchParams();

    const [searchResults, setSearchResults] = useState<Business[]>([]);
    const [loading, setLoading] = useState(false);

    // Initial Camera Properties
    const INITIAL_CAMERA = {
      center: { lat: 37.325095, lng: -121.942508 },
      zoom: 9,
    };

    // Map Coordinates
    const [cameraProps, setCameraProps] =
      useState<MapCameraProps>(INITIAL_CAMERA);
    const [markerCoordinates, setMarkerCoordinates] =
      useState<google.maps.LatLngLiteral>();

    const term = searchParams.get('term');
    const location = searchParams.get('location');

    // useEffect for if redirected from another page. If so, run the functions
    useEffect(() => {
      if (term && location) {
        const fetchSearchResults = async () => {
          const response = (
            await fetch(
              `/api/v1/business/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`,
            )
          ).json();

          const businessResponse: ApiResponse<BusinessResponse> =
            await response;
          const { data } = businessResponse;
          const { businesses, region } = data;
          setSearchResults(businesses);
          // setCameraProps({
          //     center: region.center,
          //     zoom: 10
          // })
        };
        fetchSearchResults();
      } else {
        console.log('no search params');
      }
    }, [location, term]);

    const centerHandler = useCallback((ev: MapCameraChangedEvent) => {
      const newCameraProps: MapCameraProps = {
        center: ev.detail.center,
        zoom: ev.detail.zoom,
      };
      setCameraProps(newCameraProps);
    }, []);

    const clickedBusinessHandler = (lat: number, lng: number) => {
      setMarkerCoordinates({ lat, lng });
      setCameraProps({
        zoom: 13,
        center: {
          lat,
          lng,
        },
      });
    };

    return (
      <section className="relative w-full z-10">
        <Navbar />
        <div className="max-md:hidden w-full h-screen mx-auto mt-auto fixed z-0">
          <GoogleMaps
            cameraProps={cameraProps}
            markerCoords={markerCoordinates}
            centerHandler={centerHandler}
          />
        </div>

        {searchResults.length > 0 && (
          <div className="max-md:w-full min-w-[500px] h-[93.3%] fixed overflow-y-scroll z-30 top-20 ">
            {searchResults.map((result, key) => (
              <SearchResult
                key={key}
                business={result}
                mapHandler={clickedBusinessHandler}
              />
            ))}
          </div>
        )}
      </section>
    );
  },
  {
    returnTo: '/search',
  },
);
