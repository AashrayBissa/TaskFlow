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
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    priority: task?.priority || "medium",
    isCompleted: Boolean(task?.isCompleted)
  });

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setEditTask((currInfo) => {
      return { ...currInfo, [name]: type === "checkbox" ? checked : value };
    });
  }

  let handleSubmit = async(event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8080/dashboard/editTask/${id}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(editTask)
    });
    const res = await response.json().catch(() => ({}));

    if(!response.ok){
      toast.error(res.message || "Task could not be updated.");
      return;
    }

    navigate("/dashboard");
    toast.success("Task updated successfully!");
  }

  const handleCancel = () => {
    navigate("/dashboard");
  }

  return (
    <main className="task-modal-shell">
      <section className="task-modal" aria-labelledby="task-modal-title">
        <div className="task-modal-header">
          <div>
            <h1 id="task-modal-title" className="task-modal-title">Edit Task</h1>
            <p className="task-modal-copy">Update the details for this task.</p>
          </div>
          <button type="button" className="icon-button" onClick={handleCancel} aria-label="Close edit task form">
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
              value={editTask.title}
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
              value={editTask.description}
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
                value={editTask.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="tf-form-field">
              <span className="tf-label">Priority</span>
              <PriorityBox handleInputChange={handleInputChange} task={editTask}></PriorityBox>
            </div>
          </div>

          <div className="task-status-row">
            <span className="tf-label">Status</span>
            <span>Incomplete</span>
            <Switch id="edit-task-status" checked={editTask.isCompleted} onChange={handleInputChange} />
            <span>Complete</span>
          </div>

          <div className="task-actions">
            <button type="button" onClick={handleCancel} className="tf-button tf-button-secondary">Cancel</button>
            <button className="tf-button tf-button-primary">Save Task</button>
          </div>
        </form>
      </section>
    </main>
  );
}

