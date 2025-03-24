import { authOptions } from "@/lib/authOptions";
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

//Where get and delete for admin will go

/*//Fetch all Contact us forms in the database
export async function GET() {
    //check to make sure user is logged in as admin
    const session = await getServerSession(authOptions);
    if (session.user.admin != true) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    try {
        const response = await axios.get('http://localhost:3001/api/contactUs');
        return NextResponse.json(response.data, { status: response.status });
      } catch (error) {
        console.error("Error fetching contact us forms:", error.response?.data || error.message);
        return NextResponse.json({ message: "Error fetching contact us forms" }, { status: 500 });
      }

}*/

export async function DELETE(request, { params }) {
    //check to make sure user is logged in as admin
    const session = await getServerSession(authOptions);
    if (session.user.admin != true) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    try {
        const response = await axios.delete(`http://localhost:3001/api/contactUs/${params.id}`, {
            headers: { 'Content-Type': 'application/json' }, 
            data: {
                email: session.user.email,
                admin: session.user.admin,
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error deleting contact us form: ', error.response?.data || error.message);
        return NextResponse.json({message: 'Error deleting contact us form' }, { status: 500 });
    }
}

