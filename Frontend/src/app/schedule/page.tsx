'use client';
import '../Assets/css/adminDashboard.modules.css'; // Import global CSS
import Navbar from '../navbar/navBar';
import Calendar from '../calendar/calendar'; 
import { reviewsData } from '../reviews/page'; 
import CustomerReviewsList from './reviewList';
import Sidebar from './sidebar';

export default function Page() {
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
