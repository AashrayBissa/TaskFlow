import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/layouts/Navbar/Navbar";
import Card from "../../components/ui/Card/Card";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Prioritize() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API}/dashboard`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setTasks(list);
        const allChecked = {};
        list.filter((t) => !t.isCompleted).forEach((t) => (allChecked[t._id] = true));
        setSelected(allChecked);
      })
      .catch(() => toast.error("Failed to load tasks."));

    fetch(`${API}/dashboard/get-prioritization`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.results) setResults(data.results);
      })
      .catch(() => {});
  }, []);

  function toggle(id) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAll() {
    const allChecked = {};
    activeTasks.forEach((t) => (allChecked[t._id] = true));
    if (activeTasks.every((t) => selected[t._id])) {
      setSelected({});
    } else {
      setSelected(allChecked);
    }
  }

  function refreshTasks() {
    fetch(`${API}/dashboard`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setTasks(list);
      })
      .catch(() => toast.error("Failed to refresh tasks."));
  }

  function generateNew() {
    setSelected({});
    setResults(null);
    fetch(`${API}/dashboard/save-prioritization`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ results: null }),
    }).catch(() => {});
  }

  async function handlePrioritize() {
    const taskIds = activeTasks.filter((t) => selected[t._id]).map((t) => t._id);
    if (taskIds.length === 0) {
      toast.error("Select at least one task.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/dashboard/prioritize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskIds }),
      });
      const data = await res.json();
      if (data.aiUnavailable) {
        toast("AI key not set. Showing tasks in default order.", { icon: "?" });
        const fallback = {
          prioritized: data.tasks.map((t) => ({ ...t, rank: 0, reasoning: "" })),
          summary: null,
          executionSequence: null,
          aiUnavailable: true,
        };
        setResults(fallback);
        fetch(`${API}/dashboard/save-prioritization`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ results: fallback }),
        }).catch(() => {});
        return;
      }
      if (!res.ok) {
        toast.error(data.message || "Prioritization failed.");
        return;
      }
      setResults(data);
      fetch(`${API}/dashboard/save-prioritization`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ results: data }),
      }).catch(() => {});
      toast.success("Tasks prioritized!");
    } catch {
      toast.error("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const selectedCount = activeTasks.filter((t) => selected[t._id]).length;
  const allSelected = activeTasks.length > 0 && activeTasks.every((t) => selected[t._id]);

  const prioritizedTasks = results
    ? results.prioritized
        .map((p) => {
          const task = tasks.find((t) => t._id === p.taskId);
          return task ? { ...task, rank: p.rank, reasoning: p.reasoning } : null;
        })
        .filter(Boolean)
    : [];

  return (
    <div className="page-shell">
      <Navbar />
      <div className="app-container" style={{ paddingTop: "2rem" }}>
        {!results ? (
          <>
            <div className="dashboard-heading-row" style={{ marginBottom: "1.5rem" }}>
              <div>
                <h1 className="dashboard-title" style={{ margin: 0 }}>AI Prioritize</h1>
                <p style={{ color: "var(--tf-muted)", margin: "0.25rem 0 0" }}>Select tasks to get AI-powered priority ranking.</p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
                <span style={{ color: "var(--tf-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>{selectedCount} of {activeTasks.length} selected</span>
                <button onClick={handlePrioritize} disabled={loading || selectedCount === 0} className="tf-button tf-button-primary" style={{ minWidth: "10rem" }}>
                  {loading ? "Analyzing..." : "Prioritize"}
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 600, color: "var(--tf-muted-strong)" }}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ width: "1.1rem", height: "1.1rem" }} />
                Select all / none
              </label>
            </div>
            <section className="task-grid-shell" aria-label="Tasks" style={{ marginTop: 0 }}>
              <div className="task-grid">
                {activeTasks.map((task) => (
                  <Card
                    key={task._id}
                    task={task}
                    selectMode={true}
                    selected={!!selected[task._id]}
                    onSelect={() => toggle(task._id)}
                  />
                ))}
                {activeTasks.length === 0 && (
                  <div className="empty-state">
                    <h2>No pending tasks</h2>
                    <p>All tasks are completed. Create new tasks to prioritize.</p>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="dashboard-heading-row" style={{ marginBottom: "1.5rem" }}>
              <div>
                <h1 className="dashboard-title" style={{ margin: 0 }}>Prioritized Tasks</h1>
                {results.summary && <p style={{ color: "var(--tf-muted)", margin: "0.25rem 0 0" }}>{results.summary}</p>}
              </div>
              <button onClick={generateNew} className="tf-button tf-button-primary" style={{ minWidth: "10rem" }}>
                Generate New
              </button>
            </div>
            {results.executionSequence && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Suggested Execution Sequence</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {results.executionSequence.split(/\s*->\s*|,\s*\d+[\.\)]\s*/).map((step, i) => {
                    const cleanTitle = step.replace(/^\d+[\.\)]\s*/, "").trim();
                    const task = tasks.find((t) => t.title.toLowerCase() === cleanTitle.toLowerCase());
                    return task ? (
                      <Card key={i} task={task} fetchTasks={refreshTasks} />
                    ) : (
                      <article key={i} className="task-card">
                        <div className="task-card-body" style={{ padding: "1.15rem" }}>
                          <div className="task-card-head">
                            <div className="task-title-row">
                              <h2 className="task-title">{cleanTitle}</h2>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
            <section className="task-grid-shell" aria-label="Prioritized Tasks" style={{ marginTop: 0 }}>
              <div className="task-grid">
                {prioritizedTasks.map((task) => (
                  <Card key={task._id} task={task} fetchTasks={refreshTasks} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
