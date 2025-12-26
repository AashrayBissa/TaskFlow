import Navbar from "../../components/layouts/Navbar/Navbar";
import AllCards from "../../components/layouts/AllCards/AllCards";
import SearchBar from "../../components/layouts/SearchBar/SearchBar";
import { useEffect, useState, } from "react";
import { useLocation } from "react-router-dom";
import {useCallback} from "react";

export default function Dashboard() {
    const location = useLocation();

    const [currUser, setCurrUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        priority: "",
        isCompleted: ""
    });

    const fetchUser = async () => {
        const res = await fetch("http://localhost:8080/user", {
            credentials: "include",
        });
        const userData = await res.json();
        setCurrUser(userData);
    };

    const fetchTasks = useCallback(async () => {
        let url = "http://localhost:8080/dashboard";

        if(location.pathname === "/dashboard/search"){
            const q = new URLSearchParams(filters).toString();
            url = `http://localhost:8080/dashboard/search?${q}`;
        }

        const res = await fetch(url, {
            credentials: "include",
        });
        const finalTask = await res.json();
        setTasks(finalTask);
    }, [filters, location.pathname]);


useEffect(() => {
    fetchUser();
}, []);

useEffect(() => {
    fetchTasks();
}, [fetchTasks]);

return (
    <div className="flex flex-col gap-10 min-h-screen">
        <Navbar />
        <SearchBar currUser={currUser} filters={filters} setFilters={setFilters} />
        <AllCards tasks={tasks} fetchTasks={fetchTasks} />
    </div>
);
}
