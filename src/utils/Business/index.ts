import { Business } from '../../../types/business';

export interface BusinessResponse {
  businesses: Business[];
  total: number;
  region: {
    center: {
      longitude: number;
      latitude: number;
    };
  };
}

// Utility functions to fetch Businesses based on term and location
export const searchBusinesses = async (
  term: string,
  location: string,
): Promise<BusinessResponse> => {
  try {
    const locationResponse = (
      await fetch(`/api/v1/business/search?term=${term}&location=${location}`)
    ).json();
    return (await locationResponse) as BusinessResponse;
  } catch (e) {
    console.error('Error searching for locations: ', e);
    throw e;
  }
};
