'use client';
import '../Assets/css/schedule.modules.css';
import Navbar from '../navbar/navBar';
import '../Assets/css/calendar.modules.css';
import Calendar from '../calendar/calendar';
import React, { useState } from 'react';
import axios from 'axios';

const placeholderUserId = '672c51b59ccd804fc4195ed0';
export default function Page() {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const availableHours = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
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

        try {
            const appointmentData = {
                date: selectedDate.toISOString(),
                time: selectedTime, 
                email: formData.email,
                userId: placeholderUserId, // Placeholder user ID
                name: formData.name,
                phone: formData.phone,
                message: formData.message,
            };

            const response = await axios.post('http://localhost:3000/api/appointments', appointmentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert("Appointment scheduled successfully!");
            console.log("Response from server:", response.data);
        } catch (error) {
            const err = error as any;
            console.error("Error scheduling appointment:", err.response?.data || err.message);
            alert(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleNextStep = () => {
        if (selectedDate && selectedTime) {
            setShowForm(true);
        } else {
            alert("Please select a date and time slot.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="pageContainer">
                {/* Left Container: Worker Description */}
                <div className="workerDescriptionContainer">
                    <h2>Worker Information</h2>
                    <p>Name: Sigfrido Vasquez</p>
                    <p>Role: Owner</p>
                    <p>Specialties: Construction</p>
                    <br />
                    <p>Thank you for scheduling a call to speak with us about your construction projects and goals.</p>
                    <br />
                    <p>Your call will vary depending on the criteria of the potential project. We are working to figure out exactly what you need and how to make it happen. We’ll provide pricing and a quote for the jobs discussed.</p>
                </div>

                {/* Right Container */}
                <div className="calendarAvailabilityContainer">
                    {showForm ? (
                        // Form Section
                        <div className="informationForm">
                            <h2>Provide Your Information</h2>
                            <p>Project Inquiry - 20-min. Touch base</p>
                            <p>Requested Date: {selectedDate?.toLocaleDateString()}, {selectedTime}</p>
                            <p>Worker: Sigfrido Vasquez</p>
                            <p>Language: English</p>
                            <form className="provideInfoForm" onSubmit={handleSubmitForm}>
                                <div className="formGroup">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="phone">Phone Number:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="message">How can we help you?</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submitButton">Submit Information</button>
                            </form>
                        </div>
                    ) : (
                        // Calendar Section
                        <>
                            <h2>Pick a Date and Time</h2>
                            <p>Duration: 20 Minutes</p>
                            <p>Time Zone: United States; Pacific Time (GMT-7:00) [DST]</p>
                            <Calendar onDateChange={handleDateChange} />
                            <div className="availability">
                                <h2>Availability</h2>
                                <p>Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : "None"}</p>
                                <div className="timeSlots">
                                    {availableHours.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeClick(time)}
                                            className={`timeSlotButton ${selectedTime === time ? 'selected' : ''}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={handleNextStep} className="submitButton">Next</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
