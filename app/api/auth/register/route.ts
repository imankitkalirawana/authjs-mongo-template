import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// api to register a user
export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectDB();
    const { name, email, password } = data;
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Please enter all fields' },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let user = new User({ name, email, password: hashedPassword });
    user = await user.save();
    return NextResponse.json(
      { message: 'User created successfully', data: user },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
