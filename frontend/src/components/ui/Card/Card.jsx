import "./Card.css";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Card({task, fetchTasks}) {

    const navigate = useNavigate();

     async function handleDelete (task)  {
        let response = await fetch(`http://localhost:8080/dashboard/delTask/${task._id}`,{
            method: "DELETE",
            credentials: "include"
        });
        let res = await response.json();
        console.log(res);
        if(response.ok){
            toast.success("Task deleted successfully!");
        }
        fetchTasks();
    }
 
    async function handleCheck(task) {
        let response = await fetch(`http://localhost:8080/dashboard/checkTask/${task._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({...task, isCompleted:!task.isCompleted})
        });
        let res = await response.json();
        console.log(res);

        fetchTasks();
    }

    function handleEdit(){
        navigate(`/dashboard/editTask/${task._id}`, {state : {task}});
    }

    function priorityColor(priorityValue){
        if(priorityValue === "low"){
            return "badge badge-soft badge-success";
        }else if(priorityValue === "medium"){
            return "badge badge-soft badge-primary";
        }else{
            return "badge badge-soft badge-error";
        }
    }

    function isCompletedColor(isCompletedValue){
        if(isCompletedValue === true){
            return "badge badge-soft badge-info";
        }else{
            return "badge badge-soft badge-warning";
        }
    }

    function convertDateToDay(date){
        if(date === new Date(Date.now()).toLocaleDateString("en-IN")){
            return "Today";
        }else if(date == new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString("en-IN")){
            return "Yesterday";
        }else if(date == new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-IN")){
            return "Tomorrow"; 
        }else{
            return date;
        }
    }
 
    return (
        <div className="card bg-base-200 w-96 shadow-sm border border-gray-700">
            <div className="card-body">
                <div className="head flex justify-between">
                    <div className="flex gap-5 align-center">
                        <input type="checkbox" checked = {task.isCompleted} onChange={()=>handleCheck(task)}/>
                        <h2 className="card-title" style={task.isCompleted ? { textDecoration: "line-through", textDecorationThickness: "3px", } : {}}>{task.title}</h2>
                    </div>
                    <div className="flex gap-3">
                        <button className="editIcon text-lg" onClick={handleEdit}><i className="fa-solid fa-pencil"></i></button> 
                        <button onClick={()=>handleDelete(task)} className="deleteIcon text-lg"><i className="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
                <p className="description mb-3 text-gray-400" style={task.isCompleted ? { textDecoration: "line-through", textDecorationThickness: "3px", } : {}}>{task.description}</p>
                <div className="card-actions flex justify-between">
                    <div className="date">
                        <div className="text-gray-500 flex justify-center items-center gap-2"><i className="fa-solid fa-calendar"></i>{convertDateToDay(new Date(task.dueDate).toLocaleDateString("en-IN"))}</div>
                    </div>
                    <div className="flex gap-2">
                        <div className={priorityColor(task.priority)}>{task.priority}</div>
                        <div className={isCompletedColor(task.isCompleted)}>{task.isCompleted? "Completed" : "Pending"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}