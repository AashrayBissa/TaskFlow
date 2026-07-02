import "./Card.css";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Card({task, fetchTasks, selectMode, selected, onSelect}) {

    const navigate = useNavigate();

     async function handleDelete (task)  {
        const response = await fetch(`${API}/dashboard/delTask/${task._id}`,{
            method: "DELETE",
            credentials: "include"
        });
        if(response.ok){
            toast.success("Task deleted successfully!");
            fetchTasks();
        } else {
            const res = await response.json().catch(() => ({}));
            toast.error(res.message || "Could not delete task.");
        }
    }
 
    async function handleCheck(task) {
        const response = await fetch(`${API}/dashboard/checkTask/${task._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({...task, isCompleted:!task.isCompleted})
        });
        if(response.ok){
            fetchTasks();
        } else {
            const res = await response.json().catch(() => ({}));
            toast.error(res.message || "Could not update task.");
        }
    }

    function handleEdit(){
        navigate(`/dashboard/editTask/${task._id}`, {state : {task}});
    }

    function priorityColor(priorityValue){
        if(priorityValue === "low"){
            return "task-badge task-badge-low";
        }else if(priorityValue === "medium"){
            return "task-badge task-badge-medium";
        }else{
            return "task-badge task-badge-high";
        }
    }

    function isCompletedColor(isCompletedValue){
        if(isCompletedValue === true){
            return "task-badge task-badge-completed";
        }else{
            return "task-badge task-badge-pending";
        }
    }

    function convertDateToDay(date){
        const today = new Date();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
        if(date === today.toLocaleDateString("en-IN")){
            return "Today";
        }else if(date === yesterday.toLocaleDateString("en-IN")){
            return "Yesterday";
        }else if(date === tomorrow.toLocaleDateString("en-IN")){
            return "Tomorrow"; 
        }else{
            return date;
        }
    }
 
    return (
        <article className="task-card" style={selectMode ? { cursor: "pointer", opacity: selected ? 1 : 0.5 } : {}} onClick={selectMode ? onSelect : undefined}>
            <div className="task-card-body">
                <div className="task-card-head">
                    <div className="task-title-row">
                        {selectMode ? (
                            <input className="task-check" type="checkbox" checked={!!selected} onClick={(e) => e.stopPropagation()} onChange={onSelect} aria-label={`Select ${task.title}`} />
                        ) : (
                            <input className="task-check" type="checkbox" checked={Boolean(task.isCompleted)} onChange={()=>handleCheck(task)} aria-label={`Mark ${task.title} as ${task.isCompleted ? "pending" : "completed"}`}/>
                        )}
                        <h2 className={`task-title ${task.isCompleted ? "task-done" : ""}`}>{task.title}</h2>
                    </div>
                    {!selectMode && (
                        <div className="task-card-actions">
                            <button className="icon-button editIcon" onClick={handleEdit} aria-label={`Edit ${task.title}`}>
                                <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 20h4.2L19.3 8.9a2 2 0 0 0 0-2.8L17.9 4.7a2 2 0 0 0-2.8 0L4 15.8V20Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                                    <path d="M14 6l4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                                </svg>
                            </button> 
                            <button onClick={()=>handleDelete(task)} className="icon-button deleteIcon" aria-label={`Delete ${task.title}`}>
                                <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <p className={`description ${task.isCompleted ? "task-done" : ""}`}>{task.description}</p>
                <div className="task-card-footer">
                    <div className="date">
                        <div className="task-date">
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            {convertDateToDay(new Date(task.dueDate).toLocaleDateString("en-IN"))}
                        </div>
                    </div>
                    <div className="task-badges">
                        <div className={priorityColor(task.priority)}>{task.priority}</div>
                        <div className={isCompletedColor(task.isCompleted)}>{task.isCompleted? "Completed" : "Pending"}</div>
                    </div>
                </div>
            </div>
        </article>
    );
}
