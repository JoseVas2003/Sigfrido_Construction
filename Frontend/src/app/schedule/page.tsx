'use client'
import '../Assets/css/createAccount.modules.css';
import Navbar from '../navbar/navBar';
import '../Assets/css/calendar.modules.css';
import Calendar from '../calendar/calendar';

export default function page(){
    return (
        <div>
            <Navbar/>
            <Calendar/>
            </div>
    );
}   