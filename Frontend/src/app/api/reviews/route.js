import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import FormData from "form-data";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";


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
// export async function POST(request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ message: 'Must be logged in' }, { status: 401 });
//   }
  
//   const body = await request.json();

//   // Pass user info
//   const reviewData = {
//     ...body,
//     email: session.user.email,
//     name: session.user.name,
//     admin: session.user.admin,
//   };

//   try {
//     const response = await axios.post('http://localhost:3001/api/reviews', reviewData, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error) {
//     console.error('Error creating review:', error.response?.data || error.message);
//     return NextResponse.json({ message: 'Error creating review' }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ message: "Must be logged in" }, { status: 401 });
//   }

//   // Use request.formData() to get the multipart data
//   const webFormData = await request.formData();

//   // Create a plain object from the Web API FormData entries
//   const reviewData = {};
//   for (const [key, value] of webFormData.entries()) {
//     reviewData[key] = value;
//   }

//   // Overwrite/add session info
//   reviewData["name"] = session.user.name;
//   reviewData["email"] = session.user.email;

//   console.log("Review data to forward:", reviewData);

//   // Create a Node.js FormData instance from the plain object
//   const nodeFormData = new FormData();
//   for (const key in reviewData) {
//     nodeFormData.append(key, reviewData[key]);
//   }

//   try {
//     const response = await axios.post("http://localhost:3001/api/reviews", nodeFormData, {
//       headers: nodeFormData.getHeaders(), // axios uses these headers (including the boundary)
//     });
//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error) {
//     console.error("Error creating review:", error.response?.data || error.message);
//     return NextResponse.json({ message: "Error creating review" }, { status: 500 });
//   }
// }

export async function POST(request) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session) {
    return NextResponse.json({ message: "Must be logged in" }, { status: 401 });
  }
  

  // Get the Web API FormData
  const webFormData = await request.formData();

  // Create a Node.js FormData instance from the form-data package
  const nodeFormData = new FormData();

  // Copy entries, skipping "name" and "email"
  for (const [key, value] of webFormData.entries()) {
    if (key === "name" || key === "email") continue; // Skip these keys
    if (value instanceof Blob) {
      const buffer = Buffer.from(await value.arrayBuffer());
      nodeFormData.append(key, buffer, {
        filename: value instanceof File ? value.name : "file",
        contentType: value.type,
      });
    } else {
      nodeFormData.append(key, value);
    }
  }

  // Append session info (ensuring they're single string values)
  nodeFormData.append("name", session.user.name);
  nodeFormData.append("email", session.user.email);

  try {
    const response = await axios.post("http://localhost:3001/api/reviews", nodeFormData, {
      withCredentials: true,
      headers: nodeFormData.getHeaders(), // Sets correct multipart/form-data headers
    });    
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error creating review:", error.response?.data || error.message);
    return NextResponse.json({ message: "Error creating review" }, { status: 500 });
  }
}