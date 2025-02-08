// calendar.tsx
'use client'
import '../Assets/css/calendar.modules.css';
import React, { useState } from 'react';

interface CalendarProps {
    onDateChange: (date: Date) => void; // Callback function to notify date selection
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onDateChange(date); // Notify parent component of selected date
    };

    const generateCalendarDays = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = endOfMonth.getDate();

        const days: (Date | null)[] = [];
        const leadingEmptyDays = startOfMonth.getDay();
        
        for (let i = 0; i < leadingEmptyDays; i++) {
            days.push(null);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return days;
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className="container">
            <div className="calendarContainer">
                <div className="navButtons">
                    <button onClick={handlePreviousMonth} className="navButton">Previous</button>
                    <h2 className="monthLabel">
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={handleNextMonth} className="navButton">Next</button>
                </div>
                <div className="calendarGrid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="weekdayLabel">{day}</div>
                    ))}
                    {generateCalendarDays().map((date, index) => (
                        <div
                            key={index}
                            className={`calendarDay ${
                                date ? 
                                (isToday(date) ? 'currentDay' : '') +
                                (selectedDate && date.getTime() === selectedDate.getTime() ? ' selectedDay' : '') 
                                : ''
                            }`}
                            onClick={() => date && handleDateClick(date)}
                        >
                            {date ? date.getDate() : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
