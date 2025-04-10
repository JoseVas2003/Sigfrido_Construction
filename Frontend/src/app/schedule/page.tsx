'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import '../Assets/css/calendar.modules.css';
import '../Assets/css/schedule.modules.css';
import Calendar from '../calendar/calendar';
import Navbar from '../navbar/navBar';
import Confirmation from './confirm';

const placeholderUserId = '672c51b59ccd804fc4195ed0';

interface Appointment {
    _id: string;
    date: string;
    time: string;
    name: string;
    email: string;
}
export default function Page() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [Message, setMessage] = useState("");
    const [Action, setAction] = useState<(() => void) | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false);
    const [actionInProgressId, setActionInProgressId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    
    const {data: session, status} = useSession();
    const email = session?.user?.email;
    const names = session?.user?.name;
    const isAdmin = (session?.user as any)?.admin;
    const [blockedDates, setBlockedDates] = useState<string[]>([]);  // Track blocked dates
    const [emailStatus, setEmailStatus] = useState<string | null>(null);
    const connection = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/`;
    const authenticationURL = connection + (email);
    const formatDateOnly = (dateStr: string) => new Date(dateStr).toISOString().split('T')[0];

    const open = (message: string, action: () => void) => {
        setMessage(message);
        setAction(() => action);
        setIsOpen(true);
    };
    
    const close = () => {
        setIsOpen(false);
        setAction(null);
    };

    useEffect(() => {
        if (!email) return;
        fetchAppointments();
    }, [email]);

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
        });
        setSelectedDate(null);
        setSelectedTime(null);
        setAvailableTimes([]);
        setShowForm(false);
    };    

    const fetchAppointments = async () => {
        try {
            let response;
    
            if (isAdmin) {
                // Admin gets all appointments
                response = await axios.get(connection);
            } else {
                // Regular user fetches appointments based on their email
                response = await axios.get(authenticationURL, { 
                    params: { email }  
                });
            }

            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setLoading(false);
        }
    };

    const availableHours = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
        setShowForm(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setShowForm(false);
        setSelectedTime(null);
    
        const formattedDateOnly = date.toISOString().split('T')[0];
    
        // Block dates for users when the admin schedules
        const blockedDateOnly = blockedDates.map(d => formatDateOnly(d));
        if (blockedDateOnly.includes(formattedDateOnly)) {
            alert("Sorry, this day is blocked. Please choose another date.");
            setAvailableTimes([]); 
            return;
        }
    
        const bookedTimes = appointments
            .filter(appointment => formatDateOnly(appointment.date) === formattedDateOnly)
            .map(appointment => appointment.time);
    
        const freeTimes = availableHours.filter(time => !bookedTimes.includes(time));
    
        const appointmentCountForDate = appointments.filter(appointment => 
            formatDateOnly(appointment.date) === formattedDateOnly
        ).length;
    
        if (appointmentCountForDate >= 5) {
            alert("Sorry, there are already 5 appointments booked for this day. Please choose another date.");
            setAvailableTimes([]); 
        } else {
            setAvailableTimes(freeTimes);
        }
    };
    
const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        alert("Please fill in all the fields.");
        setIsSubmitting(false);
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
        };

        const emailData = {
            ...appointmentData,
            email: formData.email,
            message: formData.message,
        };

        // Submit appointment first (priority), then email async
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, appointmentData);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/emails/send`, emailData)
            .catch((err) => console.warn("Email failed to send:", err.message));

        alert("Appointment scheduled!");
        resetForm();

        setTimeout(() => fetchAppointments(), 1500); 
    } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Unknown error"}`);
    } finally {
        setIsSubmitting(false);
    }
};

        
    const handleReschedule = (appointmentId: string) => {
        if (!selectedDate || !selectedTime) {
            alert("Please select a new date and time before rescheduling.");
            return;
        }
    
        open(
            `Are you sure you want to reschedule this appointment to ${selectedDate.toLocaleDateString()} at ${selectedTime}?`,
            async () => {
                close();
                setActionInProgressId(appointmentId);
                
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/id/${appointmentId}`);
                    const existingAppointment = response.data; 
    
                    const updatedAppointmentData = {
                        date: selectedDate.toISOString(),
                        time: selectedTime,
                        email: existingAppointment.email,
                        name: existingAppointment.name,
                        phone: formData.phone || existingAppointment.phone,
                        message: formData.message || existingAppointment.message,
                      };
        
                    const rescheduleEmailData = {
                        name: existingAppointment.name,
                        email: existingAppointment.email,
                        message: formData.message || existingAppointment.message || "No message provided",
                        originalDate: existingAppointment.date,
                        originalTime: existingAppointment.time,
                        newDate: selectedDate.toISOString(),
                        newTime: selectedTime,
                      };

                      await Promise.all([
                        axios.put(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${appointmentId}`,
                            updatedAppointmentData
                        ),
                        axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/emails/reschedule`,
                            rescheduleEmailData
                        ),
                    ]);
    
                    alert("Appointment rescheduled successfully.");
                    resetForm();
    
                    setTimeout(() => {
                        fetchAppointments();
                    }, 400);
                } catch (error) {
                    console.error("Error rescheduling appointment:", error);
                    const err = error as any;
                    alert(`Error: ${err.response?.data?.message || err.message || "Unknown error"}`);
                } finally {
                    setActionInProgressId(null);
                }
            }
        );
    };
    
    const handleCancel = (appointmentId: string) => {
        open(
            "Are you sure you want to cancel this appointment? This action cannot be undone.",
            async () => {
                close();
                setActionInProgressId(appointmentId);
    
                try {
                    // Try using local appointment state first
                    let existingAppointment = appointments.find(appt => appt._id === appointmentId);
    
                    if (
                        !existingAppointment ||
                        !(existingAppointment as any).phone
                    ) {
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/id/${appointmentId}`);
                        existingAppointment = response.data;
                    }
    
                    if (!existingAppointment) {
                        alert("Appointment not found.");
                        setActionInProgressId(null);
                        return;
                    }
    
                    const cancelAppointmentData = {
                        date: existingAppointment.date,
                        time: existingAppointment.time,
                        email: existingAppointment.email,
                        name: existingAppointment.name,
                        phone: (existingAppointment as any).phone || "",
                    };
    
                    // Send both requests in parallel
                    await Promise.all([
                        axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/emails/cancel`,
                            cancelAppointmentData,
                            { headers: { "Content-Type": "application/json" } }
                        ),
                        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${appointmentId}`)
                    ]);
    
                    alert("Appointment canceled successfully.");
                    resetForm(); 
                    setTimeout(() => fetchAppointments(), 400);
                } catch (error: any) {
                    console.error("Error canceling appointment:", error);
                    alert(`Error: ${error.response?.data?.message || error.message}`);
                } finally {
                    setActionInProgressId(null);
                }
            }
        );
    };
        
    const blockSelectedDate = async () => {
        // Early exit if missing info
        if (!selectedDate || !selectedTime) {
            alert("Please select both a date and time to block.");
            return;
        }
    
        setIsBlocking(true);
    
        try {
            // Check if the slot is already blocked/booked 
            const isAlreadyBlocked = appointments.some(
                (appt) =>
                    appt.name === "Blocked" &&
                    formatDateOnly(appt.date) === formatDateOnly(selectedDate.toISOString()) &&
                    appt.time === selectedTime
            );
    
            if (isAlreadyBlocked) {
                alert("This time slot is already blocked.");
                return;
            }
    
            const blockData = {
                date: selectedDate.toISOString(),
                time: selectedTime,
                email: email,
                userId: placeholderUserId,
                name: "Blocked",
                phone: "0",
                message: "Time slot blocked",
            };
    
            // Submit block request
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, blockData, {
                headers: { "Content-Type": "application/json" },
            });
    
            alert(`Blocked ${selectedTime} on ${selectedDate.toLocaleDateString()}`);
            resetForm();
    
            setTimeout(() => fetchAppointments(), 300);
        } catch (error) {
            console.error("Error blocking time slot:", error);
            const msg = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error
                ? error.message
                : "An unknown error occurred while blocking the time slot.";
            alert(`Error blocking time: ${msg}`);
        } finally {
            setIsBlocking(false);
        }
    };    

    const filteredAppointments = appointments.filter((appt) => {
        const dateStr = formatDateOnly(appt.date);  // Properly formatted date
        return (
            appt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            appt.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
            dateStr.includes(searchQuery)
        );
    });    

    if (status === 'loading') return <p>Loading session...</p>;
    if (!session) return <p>You need to sign in to book an appointment.</p>;

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
                        <p>Specialties: Construction</p><br />
                        <p>Thank you for scheduling a call to speak with us about your construction projects and goals.</p><br />
                        <p>Your call will vary depending on the criteria of the potential project. We are working to figure out exactly what you need and how to make it happen. We’ll provide pricing and a quote for the jobs discussed.</p>
                    </div>

                    {/* Below workers: Appointments */}
                    <div className="appContainer">
                        <h2>Existing Appointments for {names}</h2>

                        {isAdmin && (
                        <input 
                            type="text" 
                            placeholder="Search by name, email, or date" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="searchBar"
                        />
                    )}

                        {loading ? (
                            <p>Loading appointments...</p>
                        ) : appointments.length > 0 ? (
                        <ul>
                        {filteredAppointments.map((appt) => (
                            <li key={appt._id}>
                            <strong>{new Date(appt.date).toLocaleDateString()}</strong> at {appt.time} - {appt.name} ({appt.email})
                                <div className="appointmentActions">
                                <button
                                    className="rescheduleButton"
                                    onClick={() => handleReschedule(appt._id)}
                                    disabled={actionInProgressId === appt._id}
                                >
                                    {actionInProgressId === appt._id ? "Processing..." : "Reschedule"}
                                </button>
                                <button
                                    className="cancelButton"
                                    onClick={() => handleCancel(appt._id)}
                                    disabled={actionInProgressId === appt._id}
                                >
                                    {actionInProgressId === appt._id ? "Processing..." : "Cancel"}
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
                    <Calendar 
                    onDateChange={handleDateChange}
                    value={selectedDate}
                    />

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

                    <form className="provideInfoForm" onSubmit={handleSubmitForm}>
                            <h2>Provide Your Information</h2>
                            <input type="text" name="name" placeholder="Name" value={formData.name} pattern="^[A-Za-z\s]+$" title="Name should contain letters and spaces only." onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} pattern="^\d{10}$" title="must be only digits and exactly 10 digits." onChange={handleChange} required />
                            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
                            <button type="submit" className="submitButton" id="submitButton" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>   
                        {isAdmin && (
                            <button type="button" className="blockButton" onClick={blockSelectedDate} disabled={isBlocking}>
                                {isBlocking ? "Blocking..." : "Block"}
                            </button>
                        )}
                    </form>
            </div>
        </div>
            <Confirmation
                isOpen={isOpen}
                message={Message}
                onConfirm={() => {
                    if (Action) Action();
                }}
                onCancel={close}
            />
                    </div>
        
    );
}