import { MongoClient, ObjectId } from 'mongodb';
import { Business } from './business';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export interface MongoBusiness {
  user: string;
  timestamp: string;
  business: Business;
  _id: ObjectId;
}
