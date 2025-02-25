import { NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // adjust path as needed

// GET /api/projects: Fetch all projects (public)
export async function GET() {
    try {
        const response = await axios.get('http://localhost:3001/api/projects');
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
        return NextResponse.json({ message: "Error fetching projects" }, { status: 500 });
    }
    }

// POST /api/projects: Create a new project (only admin)
export async function POST(request) {
    const session = await getServerSession(authOptions);
    // Enforce that only an admin can create a project.
    if (!session || !session.user.admin) {
        return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }
    
    // Expect JSON data (if your project creation requires file uploads, consider using a different approach)
    const body = await request.json();
    
    // Append the session's admin flag (you might also include additional user info if needed)
    const projectData = {
        ...body,
        admin: session.user.admin,
    };

    try {
        const response = await axios.post(
        'http://localhost:3001/api/projects', 
        projectData,
        { headers: { 'Content-Type': 'application/json' } }
        );
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error creating project:', error.response?.data || error.message);
        return NextResponse.json({ message: 'Error creating project' }, { status: 500 });
    }
}
