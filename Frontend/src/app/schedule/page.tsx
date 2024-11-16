'use client';
import '../Assets/css/schedule.modules.css';
import Navbar from '../navbar/navBar';
import '../Assets/css/calendar.modules.css';
import Calendar from '../calendar/calendar';
import React, { useState } from 'react';

export default function Page() {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    const availableHours = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };

    const handleSubmit = () => {
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
                            <form className="provideInfoForm">
    <div className="formGroup">
        <label htmlFor="customerName">Name:</label>
        <input type="text" id="customerName" name="customerName" required />
    </div>
    <div className="formGroup">
        <label htmlFor="customerEmail">Email:</label>
        <input type="email" id="customerEmail" name="customerEmail" required />
    </div>
    <div className="formGroup">
        <label htmlFor="customerPhone">Phone Number:</label>
        <input type="tel" id="customerPhone" name="customerPhone" required />
    </div>
    <div className="formGroup">
        <label htmlFor="customerMessage">How can we help you?</label>
        <textarea id="customerMessage" name="customerMessage" required />
    </div>
    <button type="submit" className="submitButton">
        Submit Information
    </button>
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
                                <button onClick={handleSubmit} className="submitButton">Submit</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
