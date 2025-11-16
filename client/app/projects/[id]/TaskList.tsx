"use client";
import TaskItem from "./TaskItem";
interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    projectId: string;
    createdAt: string;
}

interface Props {
    tasks: Task[];
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (id: string) => void;
}

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: Props) {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Tasks</h3>

            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks yet. Add one above!</p>
            ) : (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onTaskUpdated={onTaskUpdated}
                            onTaskDeleted={onTaskDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}