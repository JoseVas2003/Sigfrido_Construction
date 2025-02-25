'use client';
import '../Assets/css/schedule.modules.css';
import Navbar from '../navbar/navBar';
import '../Assets/css/calendar.modules.css';
import Calendar from '../calendar/calendar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const placeholderUserId = '672c51b59ccd804fc4195ed0';

interface Appointment {
    date: string;
    time: string;
}
export default function Page() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [emailStatus, setEmailStatus] = useState<string | null>(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/appointments");
            console.log("Fetched Appointments:", response.data);
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setLoading(false);
        }
    };

    const availableHours = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setShowForm(false);
        setSelectedTime(null);

        const formattedDate = date.toISOString().split("T")[0];
        const bookedTimes = appointments
            .filter(appointment => appointment.date === formattedDate)
            .map(appointment => appointment.time);

        const freeTimes = availableHours.filter(time => !bookedTimes.includes(time));
        setAvailableTimes(freeTimes);
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
        setShowForm(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
        alert("Please select a date and time.");
        return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        const appointmentData = {
            date: selectedDate.toISOString(),
            time: selectedTime,
            email: formData.email,
            userId: placeholderUserId,
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
        };

        // Save appointment to database
        await axios.post("http://localhost:3001/api/appointments", appointmentData, {
            headers: { "Content-Type": "application/json" },
        });

        // Send email notification
        await axios.post("http://localhost:3001/api/emails/send", appointmentData, {
            headers: { "Content-Type": "application/json" },
        });

        alert("Appointment scheduled successfully!");
        fetchAppointments();
    } catch (error) {
        console.error("Error scheduling appointment:", error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
    }
};

    return (
        <div>
            <Navbar />
            <div className="pageContainer">
                {/* Left Container: Worker Information */}
                <div className="workerSection">
                    <div className="workerDescriptionContainer">
                        <h2>Worker Information</h2>
                        <p>Name: Sigfrido Vasquez</p>
                        <p>Role: Owner</p>
                        <p>Specialties: Construction</p><br></br>
                        <p>Thank you for scheduling a call to speak with us about your construction projects and goals.</p><br></br>
                        <p>Your call will vary depending on the criteria of the potential project. We are working to figure out exactly what you need and how to make it happen. We’ll provide pricing and a quote for the jobs discussed.</p>
                    </div>

                    {/*Below workers: Appointments */}
                    <div className="appContainer">
                        <h2>Existing Appointments</h2>
                        {loading ? (
                            <p>Loading appointments...</p>
                        ) : appointments.length > 0 ? (
                            <ul>
                                {appointments.map((appt, index) => (
                                    <li key={index}>
                                        <strong>{new Date(appt.date).toLocaleDateString()}</strong> at {appt.time}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No appointments available.</p>
                        )}
                    </div>
                </div>

                {/* Right Container: Calendar & Booking */}
                <div className="calendarAvailabilityContainer">
                    <h2>Pick a Date and Time</h2>
                    <p>Project Inquiry - 20-min. Touch base</p>
                    <Calendar onDateChange={handleDateChange} />

                    <div className="availability">
                        <h2>Availability</h2>   
                        <p>Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : "None"}</p>
                        <div className="timeSlots">
                            {availableTimes.length > 0 ? (
                                availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeClick(time)}
                                        className={`timeSlotButton ${selectedTime === time ? 'selected' : ''}`}
                                    >
                                        {time}
                                    </button>
                                ))
                            ) : (
                                <p>No available slots for this date.</p>
                            )}
                        </div>
                    </div>

                    {showForm && (
                        <form className="provideInfoForm" onSubmit={handleSubmitForm}>
                            <h2>Provide Your Information</h2>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
                            <button type="submit" className="submitButton">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}