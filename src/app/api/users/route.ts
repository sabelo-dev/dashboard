// File: src/app/api/users/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  await dbConnect();

  try {
    // Assuming there's a method to get the active user; adjust as needed
    const activeUser = await User.findOne({ isActive: true });
    if (activeUser) {
      return NextResponse.json(activeUser, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No active user found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
