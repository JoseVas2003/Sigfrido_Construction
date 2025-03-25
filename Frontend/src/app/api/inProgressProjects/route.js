import { authOptions } from "@/lib/authOptions";
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// GET /api/inProgressProjects: Fetch all in-progress projects (public)
export async function GET() {
try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inProgressProjects`);
    return NextResponse.json(response.data, { status: response.status });
} catch (error) {
    console.error("Error fetching in-progress projects:", error.response?.data || error.message);
    return NextResponse.json({ message: "Error fetching in-progress projects" }, { status: 500 });
}
}

// POST /api/inProgressProjects: Create a new in-progress project (admin only)
export async function POST(request) {
// Verify the user is authenticated and is an admin.
const session = await getServerSession(authOptions);
if (!session || !session.user.admin) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
}

const body = await request.json();

// Prepare the project data. The backend will set dateStarted by default.
const projectData = {
    ...body,
    admin: session.user.admin,
};

try {
    const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/inProgressProjects`, 
    projectData,
    { headers: { 'Content-Type': 'application/json' } }
    );
    return NextResponse.json(response.data, { status: response.status });
} catch (error) {
    console.error('Error creating in-progress project:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Error creating in-progress project' }, { status: 500 });
}
}
