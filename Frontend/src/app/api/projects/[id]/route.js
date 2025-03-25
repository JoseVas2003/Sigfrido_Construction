// app/api/projects/[id]/route.ts
import { authOptions } from "@/lib/authOptions";
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// PUT Update a project (only admin allowed)
export async function PUT(
    request,
    { params }
    ) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.admin) {
        return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const body = await request.json();
    
    // Append the admin flag from session
    const projectData = {
        ...body,
        admin: session.user.admin,
    };

    try {
        const response = await axios.put(
        `http://localhost:3001/api/projects/${params.id}`,
        projectData,
        { headers: { 'Content-Type': 'application/json' } }
        );
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error updating project:', error.response?.data || error.message);
        return NextResponse.json({ message: 'Error updating project' }, { status: 500 });
    }
}

// DELETE Delete a project (only admin allowed)
export async function DELETE(
    request,
    { params }
    ) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.admin) {
        return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    try {
        const response = await axios.delete(
        `http://localhost:3001/api/projects/${params.id}`,
        {
            headers: { 'Content-Type': 'application/json' },
            data: { admin: session.user.admin },
        }
        );
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error deleting project:', error.response?.data || error.message);
        return NextResponse.json({ message: 'Error deleting project' }, { status: 500 });
    }
}
