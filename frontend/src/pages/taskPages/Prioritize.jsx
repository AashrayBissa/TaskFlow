import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/layouts/Navbar/Navbar";

export default function Prioritize() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setTasks(list);
        const allChecked = {};
        list.forEach((t) => (allChecked[t._id] = true));
        setSelected(allChecked);
      })
      .catch(() => toast.error("Failed to load tasks."));
  }, []);

  function toggle(id) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAll() {
    const allChecked = {};
    tasks.forEach((t) => (allChecked[t._id] = true));
    if (tasks.every((t) => selected[t._id])) {
      setSelected({});
    } else {
      setSelected(allChecked);
    }
  }

  async function handlePrioritize() {
    const taskIds = tasks.filter((t) => selected[t._id]).map((t) => t._id);
    if (taskIds.length === 0) {
      toast.error("Select at least one task.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/dashboard/prioritize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskIds }),
      });
      const data = await res.json();

      if (data.aiUnavailable) {
        toast("AI key not set. Showing tasks in default order.", { icon: "?" });
        setResults({
          prioritized: data.tasks.map((t) => ({ ...t, rank: 0, reasoning: "" })),
          summary: null,
          executionSequence: null,
          aiUnavailable: true,
        });
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Prioritization failed.");
        return;
      }

      setResults(data);
      toast.success("Tasks prioritized!");
    } catch {
      toast.error("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  const selectedCount = tasks.filter((t) => selected[t._id]).length;
  const allSelected = tasks.length > 0 && tasks.every((t) => selected[t._id]);

  return (
    <div className="page-shell">
      <Navbar />
      <div className="app-container" style={{ paddingTop: "2rem" }}>
        <div className="dashboard-heading-row" style={{ marginBottom: "1.5rem" }}>
          <div>
            <h1 className="dashboard-title" style={{ margin: 0 }}>AI Prioritize</h1>
            <p style={{ color: "var(--tf-muted)", margin: "0.25rem 0 0" }}>Select tasks to get AI-powered priority ranking.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
            <span style={{ color: "var(--tf-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>{selectedCount} of {tasks.length} selected</span>
            <button onClick={handlePrioritize} disabled={loading || selectedCount === 0} className="tf-button tf-button-primary" style={{ minWidth: "10rem" }}>
              {loading ? "Analyzing..." : "Prioritize"}
            </button>
          </div>
        </div>

        {results && (
          <section style={{ marginBottom: "2rem", border: "1px solid var(--tf-border)", borderRadius: "0.9rem", background: "var(--tf-surface)", padding: "1.5rem" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.3rem", fontWeight: 800 }}>Priority Results</h2>
            {results.summary && <p style={{ color: "var(--tf-muted)", marginBottom: "1rem", fontStyle: "italic" }}>{results.summary}</p>}
            {results.executionSequence && (
              <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "var(--tf-surface-raised)" }}>
                <strong>Suggested sequence:</strong> {results.executionSequence}
              </div>
            )}
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {results.prioritized.map((p, i) => {
                const task = tasks.find((t) => t._id === p.taskId);
                if (!task) return null;
                return (
                  <div key={p.taskId} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem", borderRadius: "0.7rem", background: i === 0 ? "var(--tf-primary)" : "var(--tf-surface-raised)", color: i === 0 ? "#fff" : "var(--tf-text)" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, minWidth: "2rem", textAlign: "center" }}>#{p.rank}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{task.title}</div>
                      {p.reasoning && <div style={{ marginTop: "0.35rem", opacity: 0.8 }}>{p.reasoning}</div>}
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                      <span className={`task-badge task-badge-${task.priority}`}>{task.priority}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 600, color: "var(--tf-muted-strong)" }}>
            <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ width: "1.1rem", height: "1.1rem" }} />
            Select all / none
          </label>
        </div>

        <section className="task-grid-shell" aria-label="Tasks" style={{ marginTop: 0 }}>
          <div className="task-grid">
            {tasks.map((task) => (
              <label key={task._id} className="task-card" style={{ cursor: "pointer", opacity: selected[task._id] ? 1 : 0.5 }}>
                <div className="task-card-body" style={{ flexDirection: "row", gap: "0.75rem" }}>
                  <input type="checkbox" checked={!!selected[task._id]} onChange={() => toggle(task._id)} style={{ marginTop: "0.2rem", width: "1.2rem", height: "1.2rem", accentColor: "var(--tf-primary)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="task-card-head">
                      <div className="task-title-row">
                        <h2 className="task-title">{task.title}</h2>
                      </div>
                    </div>
                    <p className="description" style={{ margin: "0.35rem 0 0.75rem 0" }}>{task.description}</p>
                    <div className="task-card-footer">
                      <div className="task-badges">
                        <span className={`task-badge task-badge-${task.priority}`}>{task.priority}</span>
                        <span className={`task-badge ${task.isCompleted ? "task-badge-completed" : "task-badge-pending"}`}>
                          {task.isCompleted ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            ))}
            {tasks.length === 0 && (
              <div className="empty-state">
                <h2>No tasks found</h2>
                <p>Create some tasks first, then use AI to prioritize them.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
