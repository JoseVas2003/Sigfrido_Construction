"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Assets/css/adminAppointments.modules.css";
import Navbar from "../navbar/navBar";

interface Appointment {
    _id: string;
  clientName: string;
  name?: string;
  date: string;
  time: string;
  location: string;
  status: string; // e.g., Pending, Approved, Past
  notes?: string;
  email?: string;
  phone?: string;
}

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch appointments
    useEffect(() => {
        axios.get("http://localhost:3001/api/appointments")
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

    // Handler to approve an appointment (set status to Approved)
  const handleAcceptAppointment = (id: string) => {
    axios
      .put(`http://localhost:3001/api/appointments/${id}`, {
        status: "Approved",
      })
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "Approved" }
              : appointment
          )
        );
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  // Handler to reject/delete an appointment
  const handleDeleteAppointment = (id: string) => {
    axios
      .delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };
  
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
                  <button
                    onClick={() => handleAcceptAppointment(appointment._id)}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment._id)}
                  >
                    Reject
                  </button>
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
              <p>No past appointments.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
