"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export interface Appointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  email?: string;
}

interface AppointmentSelectorProps {
  onSelect: (data: { name: string; email: string }) => void;
  onClose: () => void;
}

export default function AppointmentSelector({ onSelect, onClose }: AppointmentSelectorProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/appointments")
      .then((response) => {
        // Filter appointments within ± two weeks from now
        const now = new Date();
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        const filtered = response.data.filter((apt: Appointment) => {
          const aptDate = new Date(apt.date);
          return aptDate >= twoWeeksAgo && aptDate <= twoWeeksLater;
        });
        setAppointments(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
        setLoading(false);
      });
  }, []);

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>Select an Appointment</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found within ± two weeks.</p>
        ) : (
          <ul>
            {appointments.map((apt) => (
              <li key={apt._id} style={{cursor: "pointer", margin: "10px 0"}} 
                  onClick={() => onSelect({ name: apt.name, email: apt.email || "" })}>
                {apt.name} – {new Date(apt.date).toLocaleDateString()} {apt.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
