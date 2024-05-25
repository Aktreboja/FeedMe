import { ResponseError } from '@/utils/api';
import clientPromise from '@/_lib/mongodb';

// Get Request for fetching business by id.
export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  if (!userId) return ResponseError('User ID is required', 400);
  else {
    try {
      const db = (await clientPromise).db('FeedMe');
      const businessesCol = await db.collection('Businesses');
      const result = await businessesCol.find({ user: userId }).toArray();

      return Response.json({
        status: 200,
        data: result,
      });
    } catch (error) {
      return ResponseError('Server Error', 500);
    }
  }
}
