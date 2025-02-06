"use client";

import { useState } from "react";

type Props = {
  addTask: (text: string, priority: "High" | "Medium" | "Low", dueDate: string | null) => void;
};

export default function TaskInput({ addTask }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleAddTask = () => {
    if (!text.trim()) return;
    addTask(text, priority, dueDate);
    setText("");
    setDueDate(null);
  };

  return (
    <div className="space-y-2">
      {/* Task input field */}
      <input
        type="text"
        placeholder="Enter task..."
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Priority selection */}
      <select className="w-full p-2 border rounded" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Due date & time selection */}
      <input
        type="datetime-local"
        className="w-full p-2 border rounded"
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Add task button */}
      <button onClick={handleAddTask} className="w-full p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </div>
  );
}