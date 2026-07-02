import "./Navbar.css"

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Navbar(){
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if(response.ok){
        toast.success('Logged out successfully!');
        navigate('/');
      } else {
        toast.error('Logout failed!');
      }
    } catch (error) {
        console.log(error);
      toast.error('Something went wrong!');
    }
      
  };
  
  const activeLink = ({ isActive }) => {
    return `nav-link ${isActive ? "nav-link-active" : ""}`;
  }


    return (
        <>
            <div className="nav">
                <div className="nav-start">
                    <i className="fa-solid fa-list-check nav-logo-icon"></i>
                    <span className="nav-brand">TaskFlow</span>
                </div>
                <div className="nav-center">
                  <NavLink to="/dashboard" className={activeLink}>Dashboard</NavLink>
                  <NavLink to="/prioritize" className={activeLink}>Prioritize</NavLink>
                  <NavLink to="/profile" className={activeLink}>Profile</NavLink>
                </div>
                <div className="nav-end">
                    <button onClick={handleLogout} className="logoutBtn">Logout</button>
                    <div className="nav-avatar" aria-label="User initials">UI</div>
                </div>
            </div>
        </>
    );
}
