"use client";
import '../Assets/css/calendar.modules.css';
import React, { useState } from 'react';


const Calendar = () =>{
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
        const leadingEmptyDays = startOfMonth.getDay(); // Number of empty slots before the first day
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
        <div className="calendarContainer">
            <div className="navButtons">
                <button className="navButton" onClick={handlePreviousMonth}>
                    &lt; Previous
                </button>
                <span className="monthLabel">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button className="navButton" onClick={handleNextMonth}>
                    Next &gt;
                </button>
            </div>
            
            <div className="calendarGrid">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="weekdayLabel">
                        {day}
                    </div>
                ))}
                
                {generateCalendarDays().map((date, index) => (
                    <div key={index} className="calendarDay" style={date ? undefined : { visibility: 'hidden' }}>
                        {date ? date.getDate() : ''}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Calendar;