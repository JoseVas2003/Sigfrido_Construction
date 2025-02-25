import { NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; //adjust path as needed



// Create a new message
export async function POST(request) {

    const session = await getServerSession(authOptions);

    const body = await request.json();

    try{
        const response = await axios.post('http://localhost:3001/api/contactUs', body, {
            headers: { 'Content-Type': 'application/json'},
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error creating message:', error.response?.data || error.message);
        return NextResponse.json({ message: 'Error creating message'}, { status: 500 });
    }
}