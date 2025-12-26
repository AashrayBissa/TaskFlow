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
        <div className="flex flex-col justify-between ml-14 mr-6 gap-6">
            <h1 className="text-2xl"> Welcome, {currUser ? currUser.username : "Loading..."}</h1>
            <div className="flex justify-between items-center h-8">
                <div className="search flex gap-4">
                    <label className="searchLabel input w-60 h-8 rounded-lg">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                        <input type="search" className="searchText" placeholder="Search" onChange={handleSearch} value={filters.search}/>
                    </label>
                    <select defaultValue="Priority" className="select priority w-30 h-8 rounded-lg" onChange={handlePriority}>
                        <option disabled={true}>Priority</option>
                        <option>All</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <select defaultValue="Status" className="select w-30 h-8 rounded-lg" onChange={handleStatus}>
                        <option disabled={true}>Status</option>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Incomplete</option>
                    </select>
                    <button className="blueBtn searchBtn rounded-full" onClick={handleSearchButton}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="addTask">
                    <button className="blueBtn searchBtn rounded-lg font-bold"><Link to="/dashboard/addTask">Add new task</Link></button>
                </div>
            </div>
        </div>
    );
} 