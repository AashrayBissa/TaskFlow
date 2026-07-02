import "./Navbar.css"

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoIcon = () => (
  <svg aria-hidden="true" className="nav-logo-icon" viewBox="0 0 32 32" fill="none">
    <path d="M5 9H14M5 16H21M5 23H13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 7L28 11L24 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar(){
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
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
                    <LogoIcon />
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
