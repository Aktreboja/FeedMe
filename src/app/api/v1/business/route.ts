import clientPromise from '@/_lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  console.log('body: ', body);

  const db = (await clientPromise).db('FeedMe');
  const collection = db.collection('Businesses');
  const result = await collection.insertOne(body);

  return Response.json({
    status: 201,
  });
}
