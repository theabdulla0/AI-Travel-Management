'use server';

import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function createOrUpdateUser(userData: {
  clerkId: string;
  firstname: string;
  lastname?: string;
  imageUrl: string;
  email: string;
}) {
  console.log("Server Action: createOrUpdateUser started");
  console.log("Data received:", userData);
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("CRITICAL ERROR: MONGODB_URI is not defined in environment variables");
    throw new Error("MONGODB_URI not defined");
  }
  console.log("MONGODB_URI is defined (length: " + uri.length + ")");

  try {
    await dbConnect();
    console.log("DB Connected successfully");

    const existingUser = await User.findOne({ clerkId: userData.clerkId });

    if (!existingUser) {
      const newUser = await User.create({
        ...userData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return JSON.parse(JSON.stringify(newUser));
    }

    const needsUpdate =
      existingUser.email !== userData.email ||
      existingUser.firstname !== userData.firstname ||
      existingUser.lastname !== userData.lastname ||
      existingUser.imageUrl !== userData.imageUrl;

    if (needsUpdate) {
      existingUser.email = userData.email;
      existingUser.firstname = userData.firstname;
      existingUser.lastname = userData.lastname;
      existingUser.imageUrl = userData.imageUrl;
      existingUser.updatedAt = Date.now();
      await existingUser.save();
    }

    return JSON.parse(JSON.stringify(existingUser));
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw new Error('Failed to create or update user');
  }
}
