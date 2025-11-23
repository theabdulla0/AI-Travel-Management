import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrip extends Document {
  tripId: string;
  tripDetail: any;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

const TripSchema: Schema = new Schema({
  tripId: { type: String, required: true, unique: true },
  tripDetail: { type: Schema.Types.Mixed, required: true },
  userId: { type: String, required: true, index: true }, // Storing Clerk ID or User _id depending on usage
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: { type: Number, default: () => Date.now() },
});

const Trip: Model<ITrip> = mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);

export default Trip;
