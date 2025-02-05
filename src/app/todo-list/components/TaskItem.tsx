import React, { useState } from "react";
import { format } from "date-fns";
import { AlertCircle, Pencil, Check, X } from "lucide-react"; // Icons for editing

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
};

type Props = {
  task: Task;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string, newDueDate?: string) => void; // 🆕 Added updateTask function
};

const TaskItem: React.FC<Props> = ({ task, toggleComplete, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDueDate, setNewDueDate] = useState(task.dueDate || "");

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() && !task.completed : false;

  const handleSave = () => {
    if (newText.trim()) {
      updateTask(task.id, newText, newDueDate);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-3 border rounded-lg mb-2 shadow-md dark:bg-gray-800">
      <div className="flex items-center space-x-3">
        {/* Completion checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="cursor-pointer w-5 h-5"
        />

        {/* Edit mode */}
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border rounded px-2 py-1 dark:bg-gray-700"
            />
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="border rounded px-2 py-1 dark:bg-gray-700"
            />
          </div>
        ) : (
          <div>
            <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}`}>
              {task.text}
            </span>

            {task.dueDate && (
              <p className={`text-sm ${isOverdue ? "text-red-500 font-bold" : "text-gray-500 dark:text-gray-400"}`}>
                🗓 {format(new Date(task.dueDate), "dd/MM/yyyy")}
              </p>
            )}
          </div>
        )}

        {/* Priority level */}
        <span className={`text-white text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>

        {/* Overdue warning */}
        {isOverdue && <AlertCircle className="text-red-500 w-5 h-5" />}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-green-500">
              <Check />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-red-500">
              <X />
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-500">
            <Pencil />
          </button>
        )}
        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline text-sm">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;