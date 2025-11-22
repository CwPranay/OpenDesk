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
    const pendingTasks = tasks.filter(t => t.status === "pending");
    const inProgressTasks = tasks.filter(t => t.status === "in-progress");
    const completedTasks = tasks.filter(t => t.status === "completed");

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white">Tasks</h3>
                <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 text-xs font-medium shadow-lg">{tasks.length} total</span>
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-700 border border-gray-600 mb-3">
                        <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No tasks yet</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Pending Tasks */}
                    {pendingTasks.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Pending ({pendingTasks.length})
                                </h4>
                            </div>
                            <div className="space-y-3">
                                {pendingTasks.map((task) => (
                                    <TaskItem
                                        key={task._id}
                                        task={task}
                                        onTaskUpdated={onTaskUpdated}
                                        onTaskDeleted={onTaskDeleted}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* In Progress Tasks */}
                    {inProgressTasks.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                                    In Progress ({inProgressTasks.length})
                                </h4>
                            </div>
                            <div className="space-y-3">
                                {inProgressTasks.map((task) => (
                                    <TaskItem
                                        key={task._id}
                                        task={task}
                                        onTaskUpdated={onTaskUpdated}
                                        onTaskDeleted={onTaskDeleted}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed Tasks */}
                    {completedTasks.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Completed ({completedTasks.length})
                                </h4>
                            </div>
                            <div className="space-y-3">
                                {completedTasks.map((task) => (
                                    <TaskItem
                                        key={task._id}
                                        task={task}
                                        onTaskUpdated={onTaskUpdated}
                                        onTaskDeleted={onTaskDeleted}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}