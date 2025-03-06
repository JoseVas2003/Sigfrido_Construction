import { NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';

// PUT /api/inProgressProjects/[id]: Update a project (admin only)
export async function PUT(
request,
{ params } 
) {
const session = await getServerSession(authOptions);
if (!session || !session.user.admin) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
}

const body = await request.json();
const projectData = {
    ...body,
    admin: session.user.admin,
};

try {
    const response = await axios.put(
    `http://localhost:3001/api/inProgressProjects/${params.id}`,
    projectData,
    { headers: { 'Content-Type': 'application/json' } }
    );
    return NextResponse.json(response.data, { status: response.status });
} catch (error) {
    console.error('Error updating in-progress project:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Error updating in-progress project' }, { status: 500 });
}
}

// DELETE /api/inProgressProjects/[id]: Delete a project (admin only)
export async function DELETE(
request,
{ params }
) {
const session = await getServerSession(authOptions);
if (!session || !session.user.admin) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
}

try {
    const response = await axios.delete(`http://localhost:3001/api/inProgressProjects/${params.id}`, {
    headers: { 'Content-Type': 'application/json' },
    // Pass admin flag in case your Express backend uses it for verification.
    data: { admin: session.user.admin },
    });
    return NextResponse.json(response.data, { status: response.status });
} catch (error) {
    console.error('Error deleting in-progress project:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Error deleting in-progress project' }, { status: 500 });
}
}
