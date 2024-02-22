export const searchLocations = async (term: string, location: string) => {
    try {
        const locationResponse = (await fetch(`/api/business/search?term=${term}&location=${location}`)).json();
        return await locationResponse
    } catch (e) {
        console.error("Error searching for locations: ", e)
    }

  }