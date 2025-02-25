'use client';
import '../Assets/css/schedule.modules.css';
import Navbar from '../navbar/navBar';
import '../Assets/css/calendar.modules.css';
import Calendar from '../calendar/calendar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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
    const [blockedDates, setBlockedDates] = useState<string[]>([]);  // Track blocked dates
    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const names = session?.user?.name;
    const isAdmin = session?.user?.admin;

    useEffect(() => {
        if (!email) return;
        fetchAppointments();
    }, [email]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/appointments", {
                params: { email, isAdmin },
            });
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

        // Block dates for users when the admin schedules
        if (blockedDates.includes(formattedDate)) {
            alert("Sorry, this day is blocked. Please choose another date.");
            setAvailableTimes([]); // Prevent available times from showing
            return;
        }

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

        if (loading) {
            alert("Appointments are still loading. Please wait.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            alert("Please select a date and time.");
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0];

        // If the day is blocked, prevent submission for regular users
        if (!isAdmin && blockedDates.includes(formattedDate)) {
            alert("Sorry, this day is blocked for scheduling. Please choose another date.");
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
                email: email,
                userId: placeholderUserId,
                name: formData.name,
                phone: formData.phone,
                message: formData.message,
            };

            const emailData = {
                date: selectedDate.toISOString(),
                time: selectedTime,
                email: formData.email,
                userId: placeholderUserId,
                name: formData.name,
                phone: formData.phone,
                message: formData.message,
            };

            await axios.post("http://localhost:3001/api/appointments", appointmentData, {
                headers: { "Content-Type": "application/json" },
            });

            await axios.post("http://localhost:3001/api/emails/send", emailData, {
                headers: { "Content-Type": "application/json" },
            });

            // Block the day if it's an admin who scheduled the appointment
            if (isAdmin) {
                setBlockedDates((prevBlockedDates) => [...prevBlockedDates, formattedDate]);
            }

            alert("Appointment scheduled successfully!");
            fetchAppointments();  // Refresh the appointment list
        } catch (error) {
            console.error("Error scheduling appointment:", error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleReschedule = async (appointmentId: string) => {
        const updatedAppointmentData = {
            date: selectedDate?.toISOString(),
            time: selectedTime,
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
        };

        try {
            await axios.put(`http://localhost:3001/api/appointments/${appointmentId}`, updatedAppointmentData, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Appointment rescheduled successfully.");
            fetchAppointments();  // Refresh the appointment list after rescheduling
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancel = async (appointmentId: string) => {
        try {
            await axios.delete(`http://localhost:3001/api/appointments/${appointmentId}`);
            alert("Appointment canceled successfully.");
            fetchAppointments();  // Refresh the appointment list
        } catch (error) {
            console.error("Error canceling appointment:", error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Block a selected date for users
    const blockSelectedDate = () => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            setBlockedDates((prevBlockedDates) => [...prevBlockedDates, formattedDate]);
            alert(`The selected day ${formattedDate} has been blocked for users.`);
        } else {
            alert("Please select a date to block.");
        }
    };

    if (status === 'loading') {
        return <p>Loading session...</p>;
    }

    if (!session) {
        return <p>You need to sign in to book an appointment.</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="pageContainer">
                {/* Display User Session Information */}
                <div className="userSessionInfo">
                    <h2>User Session Information</h2>
                    <p><strong>Name:</strong> {session.user?.name}</p>
                    <p><strong>Email:</strong> {session.user?.email}</p>
                    <p><strong>Role:</strong> {session.user?.admin ? 'Admin' : 'User'}</p>
                </div>

                {/* Left Container: Worker Information */}
                <div className="workerSection">
                    <div className="workerDescriptionContainer">
                        <h2>Worker Information</h2>
                        <p>Name: Sigfrido Vasquez</p>
                        <p>Role: Owner</p>
                        <p>Specialties: Construction</p><br />
                        <p>Thank you for scheduling a call to speak with us about your construction projects and goals.</p><br />
                        <p>Your call will vary depending on the criteria of the potential project. We are working to figure out exactly what you need and how to make it happen. We’ll provide pricing and a quote for the jobs discussed.</p>
                    </div>

                    {/* Existing Appointments */}
                    <div className="appContainer">
                        <h2>Existing Appointments for {names}</h2>
                        {loading ? (
                            <p>Loading appointments...</p>
                        ) : appointments.length > 0 ? (
                            <ul>
                                {appointments.map((appt) => (
                                    <li key={appt._id}>
                                        <strong>{new Date(appt.date).toLocaleDateString()}</strong> at {appt.time}
                                        <div className="appointmentActions">
                                            <button
                                                className="rescheduleButton"
                                                onClick={() => handleReschedule(appt._id)}  // Call handleReschedule to pre-fill form
                                            >
                                                Reschedule
                                            </button>
                                            <button
                                                className="cancelButton"
                                                onClick={() => handleCancel(appt._id)} // Call handleCancel for canceling
                                            >
                                                Cancel
                                            </button>
                                        </div>
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

            {/* Admin Panel */}
            {isAdmin && (
                <div className="adminPanel">
                    <h2>Admin Control Panel</h2>
                    <button onClick={blockSelectedDate}>Block Selected Date</button>
                </div>
            )}
        </div>
    );
}
