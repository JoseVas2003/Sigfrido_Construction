import { authOptions } from "@/lib/authOptions";
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// Delete a review
// Both the review owner (veryfied by email) and an admin can delete.
export async function DELETE(
  request,
  { params }
) {
  const session = await getServerSession(authOptions);
  console.log("TYRING TO DELETE, SESSION: " + session);
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Forward the DELETE request to backend.
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${params.id}`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: session.user.email,
        admin: session.user.admin,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error deleting review:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Error deleting review' }, { status: 500 });
  }
}

// Only the review owner (matched by email) is allowed to update a review
// admin can't update
export async function PUT(
  request,
  { params }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  // Enforce that admins cannot update reviews.
  if (session.user.admin === true) {
    return NextResponse.json({ message: 'Admins are not allowed to update reviews.' }, { status: 403 });
  }

  const body = await request.json();

  // Append session user info for ownership checking.
  const reviewData = {
    ...body,
    email: session.user.email,
    name: session.user.name,
    admin: session.user.admin,
  };

  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${params.id}`, reviewData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error updating review:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Error updating review' }, { status: 500 });
  }
}
