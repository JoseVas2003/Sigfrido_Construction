"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../adminDashboard/adminSidebar.js";
import "../Assets/css/adminDashboard.modules.css";
import Calendar from "../calendar/calendar";
import Navbar from "../navbar/navBar";
import AddProjectForm from "./addProjectForm";
import AppointmentSelector from "./appointmentSelector";

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
  clientName?: string;
  name?: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  email?: string;
  phone?: string;
  status?: string;
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
    axios
      .get("http://localhost:3001/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Fetch appointments from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/appointments")
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Delete a review
  const handleDeleteReview = (id: string) => {
    axios
      .delete(`http://localhost:3001/api/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((review) => review._id !== id));
      })
      .catch((error) => console.error("Error deleting review:", error));
  };
  // Fetch users from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Delete a user
  const handleDeleteUser = (id: string) => {
    axios
      .delete(`http://localhost:3001/api/users/${id}`)
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
        <Sidebar />

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
                Upcoming & Past Appointments
              </button>

              {loading ? (
                <p>Loading appointments...</p>
              ) : appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-card">
                    <p>
                      <strong>
                        Name: {appointment.clientName || appointment.name}
                      </strong>
                    </p>
                    <p>
                      <strong>Date:</strong> {appointment.date} -{" "}
                      {appointment.time}
                    </p>

                    {appointment.notes && (
                      <p>
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    )}
                    {appointment.email && (
                      <p>
                        <strong>Email:</strong> {appointment.email}
                      </p>
                    )}
                    {appointment.phone && (
                      <p>
                        <strong>Phone:</strong> {appointment.phone}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>No appointments available.</p>
              )}
            </section>
          </div>

          {/* Calendar Section */}
          <div className="sectionWrapper">
            <section className="calendar">
              <h2 className="sectionHeader">Appointments</h2>
              <div className="calendarWidget">
                <Calendar
                  onDateChange={function (date: Date): void {
                    throw new Error("Function not implemented.");
                  }}
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
                      <em>{new Date(user.createdAt).toLocaleString()}</em>
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
