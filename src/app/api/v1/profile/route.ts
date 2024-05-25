import clientPromise from '@/_lib/mongodb';

// Get Request to retrieve profile
// todo: this can come after an onboarding route
export async function GET(request: Request) {
  // Sample retrieval from collections
  const db = (await clientPromise).db('FeedMe');
  const collection = db.collection('Users');
  const user = await collection.findOne();
  console.log(user);

  const profile = {
    userName: 'DridgeGoHam',
    email: 'aktreboja@gmail.com',
    location: {
      City: 'Stockton',
      State: 'California',
      zipCode: 95206,
      country: 'United States',
    },
    created: 'May 5th, 2024',
  };
  return Response.json(profile);
}
