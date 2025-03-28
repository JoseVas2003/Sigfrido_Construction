import axios from 'axios';
import { NextResponse } from 'next/server';

//Fetch all Contact us forms in the database
export async function GET() {
    //check to make sure user is logged in as admin
    /*const session = await getServerSession(authOptions);
    if (session.user.admin != true) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }*/

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contactUs`);
        return NextResponse.json(response.data, { status: response.status });
      } catch (error) {
        console.error("Error fetching contact us forms:", error.response?.data || error.message);
        return NextResponse.json({ message: "Error fetching contact us forms" }, { status: 500 });
      }

}

// Create a new message
export async function POST(request) {


    const body = await request.json();

    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contactUs`, body, {
            headers: { 'Content-Type': 'application/json'},
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error creating message:', error.response?.data || error.message);
        return NextResponse.json({ message: 'Error creating message'}, { status: 500 });
    }
}