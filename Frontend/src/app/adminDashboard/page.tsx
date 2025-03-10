"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navBar";
import '../Assets/css/adminDashboard.modules.css'; 
import Calendar from "../calendar/calendar";



interface Review {
    _id: string;
    name: string;
    stars: number;
    title: string;
    content: string;
    createdAt: string;
}

interface Appointment {
    _id: string;
    clientName: string;
    date: string;
    time: string;
    location: string;
    notes?: string;
    email?: string;
    phone?: string;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    admin: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    // Fetch reviews from MongoDB
    useEffect(() => {
        axios.get("http://localhost:3000/api/reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    // Fetch appointments from MongoDB
    useEffect(() => {
        axios.get("http://localhost:3000/api/appointments")
            .then((response) => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    // Fetch users from MongoDB
    useEffect(() => {
        axios.get("http://localhost:3001/api/users/")
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // Delete a review
    const handleDeleteReview = (id: string) => {
        axios.delete(`http://localhost:3000/api/reviews/${id}`)
            .then(() => {
                setReviews(reviews.filter((review) => review._id !== id));
            })
            .catch((error) => console.error("Error deleting review:", error));
    };

    // Delete a user
    const handleDeleteUser = (id: string) => {
        axios.delete(`http://localhost:3001/api/users/${id}`)
        .then(() => {
            setUsers(users.filter((user) => user._id != id));
        })
        .catch((error) => console.error("Error deleting user:", error));
    };
    return (
        <div>
            <Navbar />
              {/* Add Project Button */}
        <div className="addProjectButtonContainer">
            <button className="addProjectButton">Add Project</button>
        </div>
            <div className="admin-dashboard">
                {/* Sidebar */}
                <div className="sidebar">
                    <ul>
                        <li>Dashboard</li>
                        <li>Messages</li>
                        <li>Projects</li>
                        <li>Settings</li>
                        <li>Reviews</li>
                        <li>Upload Photos</li>
                    </ul>
                </div>
    
                {/* Main Content Container */}
                <div className="mainContent">
                    
                    {/* Reviews Section */}
                    <div className="sectionWrapper">
                        <section className="reviews">
                        <button 
                        className="sectionHeaderButton"
                        onClick={() => window.location.href = "/AdminReviews"}>  Manage Reviews
                           </button>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review._id} className="review-card">
                                        <p>
                                            <strong>{review.name}</strong>{" "}
                                            <span>{"⭐".repeat(review.stars)}</span>
                                        </p>
                                        <p><em>{new Date(review.createdAt).toLocaleString()}</em></p>
                                        <p><strong>{review.title}</strong></p>
                                        <p>{review.content}</p>
                                        <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </section>
                    </div>
   
                    {/* Appointments Section */}
                    <div className="sectionWrapper">
                    <section className="appointments">
                    <button 
                   className="sectionHeaderButton"
                           onClick={() => window.location.href = "/AdminAppointments"}>
                                  Upcoming & Past Appointments
                          </button>
        
                            {loading ? (
                                <p>Loading appointments...</p>
                            ) : appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div key={appointment._id} className="appointment-card">
                                        <p><strong>{appointment.clientName}</strong></p>
                                        <p>{appointment.date} - {appointment.time}</p>
                                        <p><strong>Location:</strong> {appointment.location}</p>
                                        {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
                                        {appointment.email && <button onClick={() => window.location.href = `mailto:${appointment.email}`}>Email</button>}
                                        {appointment.phone && <button onClick={() => window.location.href = `tel:${appointment.phone}`}>Call</button>}
                                    </div>
                                ))
                            ) : (
                                <p>No appointments available.</p>
                            )}
                             <button className="viewAllAppointmentsButton" onClick={() => window.location.href = "/admin/appointments"}>View All Appointments
                           </button>
                        </section>
                    </div>
    
                    {/* Calendar Section */}
                    <div className="sectionWrapper">
                        <section className="calendar">
                            <h2 className="sectionHeader">Appointments</h2>
                            <div className="calendarWidget">
                               <Calendar onDateChange={function (date: Date): void {
                                    throw new Error("Function not implemented.");
                                } }                              // appointments={appointments}
                            />
                            </div>
                        </section>
                    </div>

                    {/* Users Section */}
                    <div className="sectionWrapper">
                        <section className="users">
                            <h2 className="sectionHeader">Users</h2>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <div key={user._id} className="user-card">
                                        <p>
                                            <strong>{user.firstName}</strong>{" "}
                                            <strong>{user.lastName}</strong>
                                        </p>
                                        <p>{user.email}</p>
                                        <p>{user.phone}</p>
                                        <p>{"Admin: "} <em>{new Boolean(user.admin).toLocaleString()}</em></p>
                                        <p>{"Created at: "}<em>{new Date(user.createdAt).toLocaleString()}</em></p>
                                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p>No users available.</p>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}