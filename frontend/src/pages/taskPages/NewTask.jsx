import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PriorityBox from "../../components/ui/PriorityBox/PriorityBox";
import Switch from "../../components/ui/Switch/Switch";

export default function NewTask() {
  let navigate = useNavigate();
  
  let [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    priority: "medium",
  });

  function handleInputChange(event) {
    setNewTask((currInfo) => {
      return { ...currInfo, [event.target.name]: event.target.value };
    });
  }

  let handleSubmit = async(event) => {
    event.preventDefault();
     console.log(newTask);

    const response = await fetch("http://localhost:8080/dashboard/addTask",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(newTask)
    });
    const res = await response.json();
    console.log(res);

    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      priority: "medium",
    });

    navigate("/dashboard");
    
    toast.success("Task added successfully!");
  }

  const handleCancel = () => {
    navigate("/dashboard");
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-5">Add new task</h2>
        <p className="text-xl mb-10 text-gray-500">
          Fill in the details to add a new task
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
              value={newTask.title}
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
              value={newTask.description}
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
                placeholder="Enter a date"
                value={newTask.dueDate ? newTask.dueDate : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-0.5">
              <label htmlFor="priority" className="block text-start">
                Priority
              </label>
              <PriorityBox handleInputChange={handleInputChange} task={newTask}></PriorityBox>
            </div>
          </div>

          <div className="flex flex-row w-full mt-1 gap-6">
            <button type="button" onClick={handleCancel} className="blueBtn h-10 w-full font-bold rounded-xl p-2">
              Cancel
            </button>
            <button className="blueBtn h-10 w-full font-bold rounded-xl p-2">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

