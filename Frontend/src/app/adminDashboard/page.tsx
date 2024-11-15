'use client';
import '../Assets/css/createAccount.modules.css'; // Include the main CSS file here
import Navbar from '../navbar/navBar';
import Calendar from '../calendar/calendar'; 
import { reviewsData } from '../reviews/page'; 
import CustomerReviewsList from './reviewList';
import Sidebar from './sidebar';

export default function Page() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="header">
                <h1>Sigfrido Vasquez Construction</h1>
                <div>
                    <button className="logout-btn">Logout</button>
                    <button className="add-project-btn">Add Project</button>
                </div>
            </div>
            <div className="dashboard-container">
                <div className="main-content">
                    
                    {/* Appointments Section */}
                    <div className="section-card appointments-section">
                        <h3>Pending Appointments</h3>
                        <div className="appointment-list">
                            <div className="appointment-item">
                                <input type="checkbox" defaultChecked onChange={() => {}} />
                                <p>Residential Home Construction 6:00pm-7:00pm 10/10/2024</p>
                                <button className="delete-btn">X</button>
                            </div>
                            <div className="appointment-item">
                                <input type="checkbox" defaultChecked onChange={() => {}} />
                                <p>Office Renovation 7:00pm-8:00pm 11/12/2024</p>
                                <button className="delete-btn">X</button>
                            </div>
                            <div className="appointment-item">
                                <input type="checkbox" defaultChecked onChange={() => {}} />
                                <p>Residential Bathroom Remodeling 8:30pm-9:30pm 10/23/2024</p>
                                <button className="delete-btn">X</button>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="section-card calendar-section">
                        <h3>Appointments</h3>
                        <div className="calendar">
                            <Calendar /> {/* Calendar component added here */}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="section-card review-section">
                        <h3>Manage Feedback</h3>
                        <section>
                            <h2>Customer Reviews</h2>
                            <CustomerReviewsList reviews={reviewsData} />
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}