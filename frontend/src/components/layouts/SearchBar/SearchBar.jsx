import "./SearchBar.css"

import { Link, useNavigate } from "react-router-dom";

export default function SearchBar({currUser, filters, setFilters}) {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };
 
    const handlePriority = (e) => {
        const value = e.target.value === "All" ? "" : e.target.value.toLowerCase();
        setFilters(prev => ({ ...prev, priority: value }));
    };

    const handleStatus = (e) => {
        const value = e.target.value;

        let finalValue = "";

        if (value === "Completed") finalValue = "true";
        else if (value === "Incomplete") finalValue = "false";
        else finalValue = ""; // All

        setFilters(prev => ({ ...prev, isCompleted: finalValue }));
    };

    const handleSearchButton = () => {
        navigate("/dashboard/search");
    };

    return (
        <section className="dashboard-toolbar" aria-label="Task filters">
            <div className="dashboard-heading-row">
                <div>
                    <h1 className="dashboard-title">Welcome, {currUser ? currUser.username : "Loading..."}</h1>
                    <label className="searchLabel">
                        <svg className="search-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="searchText" placeholder="Search for tasks..." onChange={handleSearch} value={filters.search}/>
                    </label>
                </div>
                <Link className="tf-button tf-button-primary add-task-button" to="/dashboard/addTask">
                    <span aria-hidden="true">+</span>
                    Add New Task
                </Link>
            </div>
            <div className="filter-row">
                    <select defaultValue="Priority" className="filter-select" onChange={handlePriority} aria-label="Filter by priority">
                        <option disabled>Priority</option>
                        <option>All</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <select defaultValue="Status" className="filter-select" onChange={handleStatus} aria-label="Filter by status">
                        <option disabled>Status</option>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Incomplete</option>
                    </select>
                    <button className="searchBtn" onClick={handleSearchButton} aria-label="Apply search filters">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M11 19a8 8 0 1 0 0-16a8 8 0 0 0 0 16ZM21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </button>
            </div>
        </section>
    );
} 
