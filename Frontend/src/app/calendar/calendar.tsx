"use client";
import '../Assets/css/calendar.modules.css';
import React, { useState } from 'react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const generateCalendarDays = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = endOfMonth.getDate();

        const days = [];

        // Add leading empty days to align the first day of the month correctly
        const leadingEmptyDays = startOfMonth.getDay();
        for (let i = 0; i < leadingEmptyDays; i++) {
            days.push(null); // Push null to represent empty days
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return days;
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="container">
            <div className="headerContainer">
            </div>
            <div className="calendarContainer">
                <div className="navButtons">
                    <button onClick={handlePreviousMonth} className="navButton">Previous</button>
                    <h2 className="monthLabel">
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={handleNextMonth} className="navButton">Next</button>
                </div>
                <div className="calendarGrid">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="weekdayLabel">
                            {day}
                        </div>
                    ))}
                    {generateCalendarDays().map((date, index) => (
                        <div
                            key={index}
                            className={`calendarDay ${
                                date &&
                                date.getDate() === new Date().getDate() &&
                                date.getMonth() === new Date().getMonth() &&
                                date.getFullYear() === new Date().getFullYear()
                                    ? 'currentDay'
                                    : ''
                            }`}
                        >
                            {date ? date.getDate() : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
