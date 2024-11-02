'use client'
import Navbar from "../navbar/navBar";
import "../Assets/css/ClientDashboard.modules.css"

export default function page(){
    return (
        <div>
            <Navbar/>
            <div>
                <div className="Left_profile_bar">
                    <div className="Circle">J</div>
                    <h1>Welcome back, John!</h1>
                    
                    {/* <div className="Test">
                        <h1>Hello</h1>
                    </div> */}
                </div>
            </div>

        </div>
    );
}