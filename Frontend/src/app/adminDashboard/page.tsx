"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navBar";
import '../Assets/css/adminDashboard.modules.css';
import Calendar from "../calendar/calendar";
import AddProjectForm from "./addProjectForm";
import AppointmentSelector, { Appointment as AppointmentType } from "./appointmentSelector";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";



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
    name: string;
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
const [showAddProjectForm, setShowAddProjectForm] = useState(false);
const [showAppointmentSelector, setShowAppointmentSelector] = useState(false);
const [autofillData, setAutofillData] = useState({
    name: "",
    email: "",
});
const [users, setUsers] = useState<User[]>([]);


// Fetch reviews from MongoDB
useEffect(() => {
    axios.get("http://localhost:3001/api/reviews")
        .then((response) => {
            setReviews(response.data);
        })
        .catch((error) => console.error("Error fetching reviews:", error));
}, []);
// Fetch appointments from MongoDB
useEffect(() => {
    axios.get("http://localhost:3001/api/appointments")
        .then((response) => {
            setAppointments(response.data);
            setLoading(false);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
}, []);



// Delete a review
const handleDeleteReview = (id: string) => {
    axios.delete(`http://localhost:3001/api/reviews/${id}`)
        .then(() => {
            setReviews(reviews.filter((review) => review._id !== id));
        })
        .catch((error) => console.error("Error deleting review:", error));
};
    // Fetch users from MongoDB
useEffect(() => {
    axios.get("http://localhost:3001/api/users/")
    .then((response) => {
        setUsers(response.data);
    })
    .catch((error) => console.error("Error fetching users:", error));
}, []);




// Delete a user
const handleDeleteUser = (id: string) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
    .then(() => {
        setUsers(users.filter((user) => user._id != id));
    })
    .catch((error) => console.error("Error deleting user:", error));
};

const handleProjectAdded = (project: any) => {
    setShowAddProjectForm(false);
};


    // When an appointment is selected, update autofillData
const handleAppointmentSelect = (data: { name: string; email: string }) => {
    setAutofillData(data);
    setShowAppointmentSelector(false);
};

const calendarEvents: { title: string; start: string; id: string }[] = appointments
    .map((appointment) => {
        if (!appointment.date || !appointment.time) {
            console.error("❌ Missing Date/Time in Appointment:", appointment);
            return null; // Skip invalid entries
        }

        try {
            // ✅ Parse and format the date correctly
            const formattedDate = new Date(appointment.date).toISOString().split("T")[0];

            // ✅ Convert time to a valid format
            const timeParts = appointment.time.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/i);
            if (!timeParts) {
                console.warn("⚠️ Time format does not match expected format:", appointment.time);
                return null;
            }

            const hours = parseInt(timeParts[1], 10);
            const minutes = timeParts[2];
            const ampm = timeParts[3];

            // Convert to 24-hour format for ISO string
            const militaryHours = ampm.toUpperCase() === "PM" && hours !== 12 ? hours + 12 : hours;
            const formattedTime = `${militaryHours.toString().padStart(2, "0")}:${minutes}:00`;

            console.log("✅ Processed Time:", formattedTime);

            return {
                title: `${hours}:${minutes} ${ampm}`, // Display 12-hour format for UI
                start: `${formattedDate}T${formattedTime}`, // Ensure correct date-time format
                id: appointment._id,
            };
        } catch (error) {
            console.error("⚠️ Error processing event:", appointment, error);
            return null;
        }
    })
    .filter((event): event is { title: string; start: string; id: string } => event !== null); // ✅ Type-safe filtering


return (
    <div>
        <Navbar />
        {/* Add Project Button + Overlays */}
        <div className="addProjectButtonContainer">
        <button
            className="addProjectButton"
            onClick={() => setShowAddProjectForm(true)}
        >
            Add Project
        </button>

        {/* Add Project Modal */}
        {showAddProjectForm && (
            <div className="modalOverlay">
                <div className="modalContent">
                <button
                    className="closeButton"
                    onClick={() => setShowAddProjectForm(false)}
                >
                ❌
                </button>
   
                {/* Button to open Appointment Selector */}
                <button
                    onClick={() => setShowAppointmentSelector(true)}
                    style={{ marginBottom: "1rem" }}
                >
                    Autofill from Appointment
                </button>




                {/* AddProjectForm */}
                <AddProjectForm
                    onProjectAdded={handleProjectAdded}
                    initialCustomerName={autofillData.name}
                    initialEmail={autofillData.email}
                />
                </div>
            </div>
            )}




            {/* Appointment Selector Modal */}
            {showAppointmentSelector && (
            <div className="modalOverlay">
                <div className="modalContent">
                <button
                    className="closeButton"
                    onClick={() => setShowAppointmentSelector(false)}
                >
                    X
                </button>
                <AppointmentSelector
                    onSelect={handleAppointmentSelect}
                    onClose={() => setShowAppointmentSelector(false)}
                />
                </div>
            </div>
            )}
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
                    onClick={() => (window.location.href = "/AdminReviews")}
                >
                    Manage Reviews
                </button>
   
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <p>
                        <strong>{review.name}</strong>{" "}
                        <span>{"⭐".repeat(review.stars)}</span>
                        </p>
                        <p>
                        <em>{new Date(review.createdAt).toLocaleString()}</em>
                        </p>
                        <p>
                        <strong>{review.title}</strong>
                        </p>
                        <p>{review.content}</p>
                        <button onClick={() => handleDeleteReview(review._id)}>
                        Delete
                        </button>
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
                    onClick={() => (window.location.href = "/AdminAppointments")}
                >
                    Upcoming &amp; Past Appointments
                </button>
   
                {loading ? (
                    <p>Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    appointments.map((appointment) => (
                    <div key={appointment._id} className="appointment-card">
                        <p>
                        <strong>{appointment.name}</strong>
                        </p>
                        <p>
                        {appointment.date} - {appointment.time}
                        </p>
                        <p>
                        <strong>Location:</strong> {appointment.location}
                        </p>
                        {appointment.notes && (
                        <p>
                            <strong>Notes:</strong> {appointment.notes}
                        </p>
                        )}
                        {appointment.email && (
                        <button
                            onClick={() =>
                            (window.location.href = `mailto:${appointment.email}`)
                            }
                        >
                            Email
                        </button>
                        )}
                        {appointment.phone && (
                        <button
                            onClick={() =>
                            (window.location.href = `tel:${appointment.phone}`)
                            }
                        >
                            Call
                        </button>
                        )}
                    </div>
                    ))
                ) : (
                    <p>No appointments available.</p>
                )}
                <button
                    className="viewAllAppointmentsButton"
                    onClick={() => (window.location.href = "/admin/appointments")}
                >
                    View All Appointments
                </button><button
            className="viewInProgressButton"
                 onClick={() => (window.location.href = "/AdminProjects")}
                >
                     View In-Progress Projects
                        </button>
                </section>
            </div>
   
            {/* Calendar Section */}
            <div className="sectionWrapper">
                        <section className="calendar">
                            <h2 className="sectionHeader">Appointments</h2>
                            <div className="calendarWidget">
                            <FullCalendar
    key={calendarEvents.length} // ✅ Forces re-rendering when events update
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    events={calendarEvents.length > 0 ? calendarEvents : []}
    eventColor="#3788d8"
    height={"auto"}
    initialDate={new Date()} 
    selectable={true}
    headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay"
    }}
    eventContent={(eventInfo) => (
        <div style={{ textAlign: "left", paddingLeft: "5px" }}>
            {eventInfo.event.title}
        </div>
    )}
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
                                <p>
                                    {"Admin: "}
                                    <em>{new Boolean(user.admin).toLocaleString()}</em>
                                </p>
                            <p>
                                {"Created at: "}
                                <em>
                                    {new Date(user.createdAt).toLocaleString()}
                                </em>
                            </p>
                            <button onClick={() => handleDeleteUser(user._id)}>
                                Delete
                            </button>
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