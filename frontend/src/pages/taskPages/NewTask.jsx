import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    isCompleted: false,
  });

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setNewTask((currInfo) => {
      return { ...currInfo, [name]: type === "checkbox" ? checked : value };
    });
  }

  let handleSubmit = async(event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/dashboard/addTask",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(newTask)
    });

    const res = await response.json().catch(() => ({}));

    if(!response.ok){
      toast.error(res.message || "Task could not be added.");
      return;
    }

    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      priority: "medium",
      isCompleted: false,
    });

    navigate("/dashboard");
    
    toast.success("Task added successfully!");
  }

  const handleCancel = () => {
    navigate("/dashboard");
  }

  return (
    <main className="task-modal-shell">
      <section className="task-modal" aria-labelledby="task-modal-title">
        <div className="task-modal-header">
          <div>
            <h1 id="task-modal-title" className="task-modal-title">Add New Task</h1>
            <p className="task-modal-copy">Fill in the details to add a new task to your list.</p>
          </div>
          <button type="button" className="icon-button" onClick={handleCancel} aria-label="Close add task form">
            <svg aria-hidden="true" width="23" height="23" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="tf-form-field">
            <label htmlFor="title" className="tf-label">Title</label>
            <input
              className="tf-input"
              type="text"
              name="title"
              id="title"
              placeholder="e.g., Design the new landing page"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="tf-form-field">
            <label htmlFor="description" className="tf-label">Description</label>
            <textarea
              className="tf-input task-description"
              name="description"
              id="description"
              placeholder="e.g., Create mockups, get feedback, and finalize the design"
              value={newTask.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="task-form-row">
            <div className="tf-form-field">
              <label htmlFor="dueDate" className="tf-label">Due Date</label>
              <input
                className="tf-input"
                type="date"
                name="dueDate"
                id="dueDate"
                value={newTask.dueDate ? newTask.dueDate : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                onChange={handleInputChange}
              />
            </div>
            <div className="tf-form-field">
              <span className="tf-label">Priority</span>
              <PriorityBox handleInputChange={handleInputChange} task={newTask}></PriorityBox>
            </div>
          </div>

          <div className="task-status-row">
            <span className="tf-label">Status</span>
            <span>Incomplete</span>
            <Switch id="new-task-status" checked={newTask.isCompleted} onChange={handleInputChange} />
            <span>Complete</span>
          </div>

          <div className="task-actions">
            <button type="button" onClick={handleCancel} className="tf-button tf-button-secondary">Cancel</button>
            <button className="tf-button tf-button-primary">Add Task</button>
          </div>
        </form>
      </section>
    </main>
  );
}

