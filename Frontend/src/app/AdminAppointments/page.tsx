"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navBar";
import "../Assets/css/adminAppointments.modules.css"; 

interface Appointment {
    _id: string;
    clientName: string;
    date: string;
    time: string;
    location: string;
    status: string; // Add a status field (Pending, Approved, Past)
    notes?: string;
    email?: string;
    phone?: string;
}

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch appointments
    useEffect(() => {
        axios.get("http://localhost:3000/api/appointments")
            .then((response) => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    // Categorize appointments
    const upcomingAppointments = appointments.filter(app => new Date(app.date) > new Date() && app.status === "Approved");
    const pastAppointments = appointments.filter(app => new Date(app.date) < new Date());
    const pendingAppointments = appointments.filter(app => app.status === "Pending");

    return (
        <div>
            <Navbar />
            <div className="admin-appointments-container">
                <h1>Appointments</h1>

                {/* Pending Appointments */}
                <div className="sectionWrapper">
                    <section className="appointments">
                        <h2 className="sectionHeader">Pending Approval</h2>
                        {pendingAppointments.length > 0 ? (
                            pendingAppointments.map((appointment) => (
                                <div key={appointment._id} className="appointment-card">
                                    <p><strong>{appointment.clientName}</strong></p>
                                    <p>{appointment.date} - {appointment.time}</p>
                                    <p><strong>Location:</strong> {appointment.location}</p>
                                    <button>Approve</button>
                                    <button>Reject</button>
                                </div>
                            ))
                        ) : (
                            <p>No pending appointments.</p>
                        )}
                    </section>
                </div>

                {/* Upcoming Appointments */}
                <div className="sectionWrapper">
                    <section className="appointments">
                        <h2 className="sectionHeader">Upcoming Appointments</h2>
                        {upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map((appointment) => (
                                <div key={appointment._id} className="appointment-card">
                                    <p><strong>{appointment.clientName}</strong></p>
                                    <p>{appointment.date} - {appointment.time}</p>
                                    <p><strong>Location:</strong> {appointment.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No upcoming appointments.</p>
                        )}
                    </section>
                </div>

                {/* Past Appointments */}
                <div className="sectionWrapper">
                    <section className="appointments">
                        <h2 className="sectionHeader">Past Appointments</h2>
                        {pastAppointments.length > 0 ? (
                            pastAppointments.map((appointment) => (
                                <div key={appointment._id} className="appointment-card">
                                    <p><strong>{appointment.clientName}</strong></p>
                                    <p>{appointment.date} - {appointment.time}</p>
                                    <p><strong>Location:</strong> {appointment.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No past appointments.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}