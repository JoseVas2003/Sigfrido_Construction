'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Assets/css/adminDashboard.modules.css'; // Import global CSS
import '../Assets/css/calendar.modules.css';
import Navbar from '../navbar/navBar';

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
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <ul>
                    <li>Welcome Sigfrido</li>
                    <li>Dashboard</li>
                    <li>Messages</li>
                    <li>Projects</li>
                    <li>Settings</li>
                    <li>Reviews</li>
                    <li>Upload Photos</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="mainContent">
                {/* Appointments Section */}
                <div className="sectionWrapper">
                    <button className="sectionHeader">Pending Appointments</button>
                    <section className="appointments">
                        <ul>
                            <li>
                                <input type="checkbox" defaultChecked />
                                Residential Home Construction <br />
                                <span>6:00pm - 7:00pm</span> <br />
                                <span>10/10/2024</span>
                                <button>X</button>
                            </li>
                            <li>
                                <input type="checkbox" defaultChecked />
                                Office Renovation <br />
                                <span>7:00pm - 8:00pm</span> <br />
                                <span>11/12/2024</span>
                                <button>X</button>
                            </li>
                            <li>
                                <input type="checkbox" defaultChecked />
                                Residential Bathroom Remodeling <br />
                                <span>8:30pm - 9:30pm</span> <br />
                                <span>10/23/2024</span>
                                <button>X</button>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Calendar Section */}
                <div className="sectionWrapper">
                    <button className="sectionHeader">Appointments</button>
                    <section className="calendar">
                        <div className="calendarWidget">
                            <p>Calendar Placeholder</p>
                        </div>
                    </section>
                </div>

                {/* Reviews Section */}
                <div className="sectionWrapper">
                    <button className="sectionHeader">Manage Feedback</button>
                    <section className="reviews">
                        <div className="review">
                            <p>
                                <strong>Jordan K</strong> <span>⭐⭐⭐⭐⭐</span>
                            </p>
                            <p>
                                Reliable and Quality General Contracting <br />
                                If you're looking for reliability and high-quality construction...
                            </p>
                            <button>Reply</button>
                        </div>
                        <div className="review">
                            <p>
                                <strong>Emily R</strong> <span>⭐⭐⭐⭐⭐</span>
                            </p>
                            <p>
                                Stunning Bathroom Makeover Achieved <br />
                                I can't praise this team enough! They completely transformed...
                            </p>
                            <button>Reply</button>
                        </div>
                        <button>Delete Review</button>
                    </section>
                </div>
            </main>
        </div>
        </div>
    );
}
