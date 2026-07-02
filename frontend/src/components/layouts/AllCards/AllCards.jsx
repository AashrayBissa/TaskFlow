import Card from "../../ui/Card/Card";

export default function AllCards({tasks, fetchTasks}) {
    return (
        <section className="task-grid-shell" aria-label="Tasks">
            <div className="task-grid">
                {tasks.map((task) => {
                    return <Card key={task._id} task={task} fetchTasks={fetchTasks} />                    
                })}
                {tasks.length === 0 && (
                    <div className="empty-state">
                        <h2>No tasks found</h2>
                        <p>Create a new task or adjust your filters to see more work here.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
