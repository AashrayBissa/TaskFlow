import Navbar from "../../components/layouts/Navbar/Navbar";
import AllCards from "../../components/layouts/AllCards/AllCards";
import SearchBar from "../../components/layouts/SearchBar/SearchBar";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const [currUser, setCurrUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        priority: "",
        isCompleted: ""
    });

    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch("http://localhost:8080/user", {
                credentials: "include",
            });
            const userData = await res.json().catch(() => ({}));
            if (!res.ok) {
                setCurrUser(null);
                toast.error(userData.message || "Please log in to view your dashboard.");
                navigate("/login");
                return;
            }
            setCurrUser(userData);
        } catch {
            setCurrUser(null);
            toast.error("Could not reach the server.");
        }
    }, [navigate]);

    const fetchTasks = useCallback(async () => {
        let url = "http://localhost:8080/dashboard";

        if(location.pathname === "/dashboard/search"){
            const q = new URLSearchParams(filters).toString();
            url = `http://localhost:8080/dashboard/search?${q}`;
        }

        try {
            const res = await fetch(url, {
                credentials: "include",
            });
            const finalTask = await res.json().catch(() => []);
            if (!res.ok) {
                setTasks([]);
                return;
            }
            setTasks(Array.isArray(finalTask) ? finalTask : []);
        } catch {
            setTasks([]);
        }
    }, [filters, location.pathname]);


useEffect(() => {
    fetchUser();
}, [fetchUser]);

useEffect(() => {
    fetchTasks();
}, [fetchTasks]);

return (
    <div className="page-shell">
        <Navbar />
        <SearchBar currUser={currUser} filters={filters} setFilters={setFilters} />
        <AllCards tasks={tasks} fetchTasks={fetchTasks} />
    </div>
);
}
