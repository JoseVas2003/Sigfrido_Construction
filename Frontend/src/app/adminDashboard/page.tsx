'use client';
import '../Assets/css/adminDashboard.modules.css';
import Navbar from '../navbar/navBar';
import { clicksOut } from '../navbar/navBar';

export default function page() {
    return (
        <div>
            <Navbar />
            <main className="dashboard-container" onClick={() => { clicksOut(); }}>
                <aside className="sidebar">
                    <h2>Welcome Sigfrido</h2>
                    <ul>
                        <li>Dashboard</li>
                        <li>Messages</li>
                        <li>Projects</li>
                        <li>Settings</li>
                        <li>Reviews</li>
                        <li>Upload Photos</li>
                    </ul>
                </aside>
                <section className="main-content">
                    <div className="appointments-section">
                        <h3>Pending Appointments</h3>
                        <div className="appointment-list">
                            <div className="appointment-item">
                                <input type="checkbox" checked />
                                <p>Residential Home Construction 6:00pm-7:00pm 10/10/2024</p>
                                <button className="delete-btn">X</button>
                            </div>
                            <div className="appointment-item">
                                <input type="checkbox" checked />
                                <p>Office Renovation 7:00pm-8:00pm 11/12/2024</p>
                                <button className="delete-btn">X</button>
                            </div>
                            <div className="appointment-item">
                                <input type="checkbox" checked />
                                <p>Residential Bathroom Remodeling 8:30pm-9:30pm 10/23/2024</p>
                                <button className="delete-btn">X</button>
                            </div>
                        </div>
                    </div>
                    <div className="calendar-section">
                        <h3>Appointments</h3>
                        <div className="calendar">
                            {/* Insert a calendar component or HTML structure */}
                            <p>Calendar placeholder for September 2021</p>
                        </div>
                    </div>
                    <div className="feedback-section">
                        <h3>Manage Feedback</h3>
                        <div className="feedback-list">
                            <div className="feedback-item">
                                <p><strong>Jordan K</strong> <span>★★★★★</span></p>
                                <p>Reliable and Quality General Contracting...</p>
                                <button className="reply-btn">Reply</button>
                            </div>
                            <div className="feedback-item">
                                <p><strong>Emily R</strong> <span>★★★★★</span></p>
                                <p>Stunning Bathroom Makeover Achieved...</p>
                                <button className="reply-btn">Reply</button>
                            </div>
                            <div className="feedback-item">
                                <p><strong>Emily R</strong> <span>★★★★★</span></p>
                                <p>Outstanding Renovation Work...</p>
                                <button className="reply-btn">Reply</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
