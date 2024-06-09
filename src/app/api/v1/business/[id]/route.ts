import YelpWrapper from '@/utils/YelpWrapper';
import { ResponseError } from '@/utils/api';
import clientPromise from '@/_lib/mongodb';

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const businessId = params.id;
  console.log('businessID: ', businessId);
  if (!businessId) return ResponseError('Business ID is required', 400);
  else {
    try {
      const db = (await clientPromise).db('FeedMe');
      const collection = db.collection('Businesses');
      const result = await collection.deleteOne({ 'business.id': businessId });

      if (result.deletedCount === 0) {
        return ResponseError('Business not found', 404);
      }

      return Response.json({
        data: 'Business has been deleted successfully',
        status: 200,
      });
    } catch (error) {}
  }

  return Response.json({});
}
