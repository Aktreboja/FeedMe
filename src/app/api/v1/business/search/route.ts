import { ResponseError } from '@/utils/api';
import YelpWrapper from '@/utils/YelpWrapper';

// Get Request for retrieving
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  const location = searchParams.get('location');

  if (!term || !location)
    return ResponseError('Query Parameters Required', 400);
  else {
    const YelpApi = new YelpWrapper();
    const businesses = await YelpApi.get(
      `/businesses/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`,
    );

    return Response.json({
      data: businesses,
      status: 200,
    });
  }
}
