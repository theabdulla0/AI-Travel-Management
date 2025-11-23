import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  firstname: string;
  lastname?: string;
  imageUrl: string;
  email: string;
  subscription?: string;
  trips?: string[];
  createdAt: number;
  updatedAt: number;
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: false }, // Made optional
  imageUrl: { type: String, required: true },
  email: { type: String, required: true },
  subscription: { type: String },
  trips: { type: [String], default: [] }, // Added trips array
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: { type: Number, default: () => Date.now() },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
