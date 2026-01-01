import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PriorityBox from "../../components/ui/PriorityBox/PriorityBox";
import Switch from "../../components/ui/Switch/Switch";

export default function EditTask() {
    let {state} = useLocation();
    let navigate = useNavigate();
    let {id} = useParams();
    const task = state?.task;
  
  let [editTask, setEditTask] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || new Date(Date.now).toLocaleDateString("en-IN"),
    priority: task?.priority || "medium"
  });

  function handleInputChange(event) {
    setEditTask((currInfo) => {
      return { ...currInfo, [event.target.name]: event.target.value };
    });
  }

  let handleSubmit = async(event) => {
    console.log(editTask);
    event.preventDefault();

    const response = await fetch(`http://localhost:8080/dashboard/editTask/${id}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(editTask)
    });
    const res = await response.json();
    console.log(res);

    navigate("/dashboard");
    toast.success("Task updated successfully!");
  }

  const handleCancel = () => {
    toast.error("No edits made");
    navigate("/dashboard");
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-5" >Edit your task</h2>
        <p className="text-xl mb-10 text-gray-500">
          Fill in the details to edit your task
        </p>
        <form action="" onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2 w-md">
            <label htmlFor="title" className="block text-start">
              Title
            </label>
            <input
              className="block rounded-xl w-full"
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title"
              value={editTask.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2 w-md">
            <label htmlFor="description" className="block text-start">
              Description
            </label>
            <input
              className="block rounded-xl w-full"
              type="text"
              name="description"
              id="description"
              placeholder="Enter your description"
              value={editTask.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-between">
            <div className="grid gap-1">
              <label htmlFor="date" className="block text-start">
                Due date
              </label>
              <input
                className="block rounded-xl w-full"
                type="date"
                name="dueDate"
                id="dueDate"
                value={editTask.dueDate ? new Date(editTask.dueDate).toISOString().split("T")[0] : ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-0.5">
              <label htmlFor="priority" className="block text-start">
                Priority
              </label>
              <PriorityBox handleInputChange={handleInputChange} task={editTask}></PriorityBox>
            </div>
          </div>

          <div className="flex flex-row w-full mt-1 gap-6">
            <button type="button" onClick={handleCancel} className="blueBtn h-10 w-full font-bold rounded-xl p-2">
              Cancel
            </button>
            <button className="blueBtn h-10 w-full font-bold rounded-xl p-2">
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </> 
  );
}

