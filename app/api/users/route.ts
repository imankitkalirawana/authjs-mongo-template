import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';

export const GET = auth(async function GET(request: NextAuthRequest) {
  try {
    if (request.auth?.user?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
});
