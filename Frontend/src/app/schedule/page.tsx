"use client";

import React, { useState, useEffect, CSSProperties } from 'react';
import Navbar from '../navbar/navBar';

export default function Schedule() {
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
        <div style={styles.container}>
            {/* Navbar at the top */}
            <div style={styles.headerContainer}>
                <Navbar />
            </div>

            {/* Calendar Section */}
            <div style={styles.calendarContainer}>
                <div style={styles.navButtons}>
                    <button onClick={handlePreviousMonth} style={styles.navButton}>Previous</button>
                    <h2 style={styles.monthLabel}>
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={handleNextMonth} style={styles.navButton}>Next</button>
                </div>
                <div style={styles.calendarGrid}>
                    {/* Render weekday labels */}
                    {daysOfWeek.map((day, index) => (
                        <div key={index} style={styles.weekdayLabel}>
                            {day}
                        </div>
                    ))}

                    {/* Render calendar days */}
                    {generateCalendarDays().map((date, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.calendarDay,
                                backgroundColor: date && date.getDate() === new Date().getDate() &&
                                                 date.getMonth() === new Date().getMonth() &&
                                                 date.getFullYear() === new Date().getFullYear()
                                    ? 'red'
                                    : 'transparent',
                                color: date && date.getDate() === new Date().getDate() &&
                                       date.getMonth() === new Date().getMonth() &&
                                       date.getFullYear() === new Date().getFullYear()
                                    ? '#fff'
                                    : '#000',
                            }}
                        >
                            {date ? date.getDate() : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#EBECE5',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
    },
    headerContainer: {
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    calendarContainer: {
        width: '80%',
        maxWidth: '600px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    navButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    navButton: {
        padding: '5px 10px',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    monthLabel: {
        font: 'Avenir Next LT Pro',
        fontSize: '24px',
    },
    calendarGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
    },
    weekdayLabel: {
        fontWeight: 'bold',
        padding: '10px',
        borderRadius: '4px',
    },
    calendarDay: {
        padding: '10px',
        borderRadius: '50%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
    },
};
