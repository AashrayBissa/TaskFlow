import "./Navbar.css"

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  
  const activeLink = (isActive) => {
    return `text-sm ${isActive ? "text-blue-200 font-semibold" : "text-gray-300"}`;
  }


    return (
        <>
            <div className="nav shadow-sm flex items-center justify-between">
                <div className="nav-start flex gap-2 ml-2 justify-center items-center">
                    <i className="fa-solid fa-list-check text-xl mt-0.5"></i>
                    <a className="text-xl font-bold">Taskflow</a>
                </div>
                <div className="nav-center flex justify-center items-center gap-8">
                  <NavLink to="/dashboard" className={({isActive}) => activeLink(isActive)}>Dashboard</NavLink>
                  <NavLink to="/priority" className={({isActive}) => activeLink(isActive)}>Prioritize<sup>AI</sup></NavLink>
                </div>
                <div className="nav-end flex gap-5 items-center justify-between">
                    <button onClick={handleLogout} className="logoutBtn">Logout</button>
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-8 rounded-full">
                            <span className="text-xs">UI</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}