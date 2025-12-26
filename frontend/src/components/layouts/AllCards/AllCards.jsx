import Card from "../../ui/Card/Card";

export default function AllCards({tasks, fetchTasks}) {
    return (
        <div className="flex justify-center">
            <div className="w-300 flex flex-wrap gap-3">
                {tasks.map((task) => {
                    return <Card key={task._id} task={task} fetchTasks={fetchTasks} />                    
                })}
            </div>
        </div>
    );
}