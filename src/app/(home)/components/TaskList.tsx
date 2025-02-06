"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import { Progress } from "@/components/ui/progress"; // ShadCN Progress Bar

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
};

type Props = {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string, newDueDate?: string) => void;
};

export default function TaskList({ tasks, toggleComplete, deleteTask, updateTask }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "active">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "High" | "Medium" | "Low">("all");

  // 🔍 Filter tasks based on search, status, and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "active" && !task.completed);
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 📌 Calculate task statistics and completion percentage
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
      {/* 📌 Task Progress Statistics */}
      <div className="text-center">
        <h2 className="text-lg font-bold">Task Progress</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {completedTasks}/{totalTasks} tasks completed
        </p>
        <Progress value={completionRate} className="h-2 my-2 bg-gray-300 dark:bg-gray-700" />
        <p className="text-sm text-gray-500">{completionRate.toFixed(2)}% completed</p>
      </div>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📌 Filters */}
      <div className="flex space-x-2">
        <select
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "completed" | "active")}
        >
          <option value="all">All</option>
          <option value="active">Not Completed</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as "all" | "High" | "Medium" | "Low")}
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* 📌 Task List */}
      <ul>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask} // 🆕 Pass updateTask function
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available.</p>
        )}
      </ul>
    </div>
  );
}