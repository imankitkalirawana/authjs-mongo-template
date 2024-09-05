import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/db';

// get all users
export async function GET(request: any, response: any) {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
