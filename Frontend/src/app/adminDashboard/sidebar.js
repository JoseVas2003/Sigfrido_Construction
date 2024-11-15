import '../Assets/css/adminSidebar.modules.css'; 
import '../Assets/css/createAccount.modules.css';


const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2>Welcome, Sigfrido</h2>
            <ul className="sidebar-links">
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#messages">Messages</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#photos">Upload Photos</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;