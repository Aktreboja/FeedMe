import YelpWrapper from '@/utils/YelpWrapper';
import { ResponseError } from '@/utils/api';

// Get Request for fetching business by id.
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const businessId = params.id;

  if (!businessId) return ResponseError('Business ID is required', 400);
  else {
    try {
      const YelpApi = new YelpWrapper();
      const business = await YelpApi.get(`/businesses/${businessId}`);
      return Response.json({
        data: business,
        status: 200,
      });
    } catch (error) {
      return ResponseError('Server Error', 500);
    }
  }
}
