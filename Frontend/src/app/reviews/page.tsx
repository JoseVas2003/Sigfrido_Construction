export default function Reviews() {
    return (
        <div>
            {/* need header bar here */}
            <h1>Reviews</h1>
            <div className="star_box">
                {/* will be a function to average number of stars header */}
                <h1>4.92</h1>
                <div className="star_bars">
                    <div className="left">
                        <h2>5 Stars:</h2>
                        <h2>4 Stars:</h2>
                        <h2>3 Stars:</h2>
                        <h2>2 Stars:</h2>
                        <h2>1 Stars:</h2>
                    </div>
                    <div className="right">
                        <div className="star_bar"></div>
                        <div className="star_bar"></div>
                        <div className="star_bar"></div>
                        <div className="star_bar"></div>
                        <div className="star_bar"></div>
                    </div>
                </div>
                <div className="sort_section">
                    <h2>Sort Reviews By:</h2>
                    {/* implement dropdown menu */}
                    <select></select>
                </div>
            </div>
            <div className="feedback_section">
                <h1>We Value Your Feedback</h1>
                <p>
                    We strive to improve and tailor our services to best meet your needs. Please leave us
                    a review to let us know how we are doing and how we can make your experience even better.
                </p>
                <button className="leave_review">
                    Leave Review
                </button>
            </div>
            {/* reviews section, should be rendered from database and sorted based on menu selection */}
            <ul className="reviews">
                <li>
                    <h1 className="Name">
                        Emily R.
                    </h1>
                    <div className="stars"></div>
                    <h2 className="title">
                        Outstanding Renovation Work
                    </h2>
                    <p className="review_content">
                        Absolutely thrilled with the results! Sigfrido and his team were 
                        professional, timely, and attentive to all of our needs.
                        Highly reccomend!
                    </p>
                </li>
            </ul>
            <p>Welcome to the reviews page!</p>
        </div>
    );
}
