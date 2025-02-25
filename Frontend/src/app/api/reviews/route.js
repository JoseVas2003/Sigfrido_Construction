import { NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // adjust path as needed

// Fetch all reviews
export async function GET() {
  try {
    const response = await axios.get('http://localhost:3001/api/reviews');
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error fetching reviews:", error.response?.data || error.message);
    return NextResponse.json({ message: "Error fetching reviews" }, { status: 500 });
  }
}

// Create a new review (ensures user is logged in)
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Must be logged in' }, { status: 401 });
  }
  
  const body = await request.json();

  // Pass user info
  const reviewData = {
    ...body,
    email: session.user.email,
    name: session.user.name,
    admin: session.user.admin,
  };

  try {
    const response = await axios.post('http://localhost:3001/api/reviews', reviewData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error creating review:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Error creating review' }, { status: 500 });
  }
}
