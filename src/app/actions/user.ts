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

export async function getUserByClerkId(clerkId: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error in getUserByClerkId:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function updateUserProfile(clerkId: string, userData: {
  firstname: string;
  lastname?: string;
  email: string;
  imageUrl?: string;
}) {
  try {
    await dbConnect();
    
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    user.firstname = userData.firstname;
    user.lastname = userData.lastname;
    user.email = userData.email;
    if (userData.imageUrl) {
      user.imageUrl = userData.imageUrl;
    }
    user.updatedAt = Date.now();
    
    await user.save();
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw new Error('Failed to update user profile');
  }
}
