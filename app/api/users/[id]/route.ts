import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

// get user by id from param
export async function GET(_request: Request, context: any) {
  try {
    await connectDB();
    const userId = context.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// update user by id from param
export async function PUT(request: Request, context: any) {
  try {
    await connectDB();
    const userId = context.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }
    const user = await User.findByIdAndUpdate(userId, await request.json(), {
      new: true
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// delete user by id from param
export async function DELETE(_request: Request, context: any) {
  try {
    await connectDB();
    const userId = context.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
