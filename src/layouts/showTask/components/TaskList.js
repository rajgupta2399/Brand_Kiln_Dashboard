import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    // First apply the search filter
    const matchesSearch =
      searchQuery.trim() === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Then apply the status filter
    switch (filter) {
      case "completed":
        return task.completed;
      case "pending":
        return !task.completed;
      case "overdue": {
        if (!task.dueDate) return false;
        const currentDate = new Date();
        const taskDueDate = new Date(task.dueDate); // Assume `dueDate` is in ISO format
        return !task.completed && currentDate > taskDueDate;
      }
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4, mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          No tasks found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;
