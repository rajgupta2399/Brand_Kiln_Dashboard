import React, { useState } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "store/taskSlice";
import "./TaskForm.css";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      dispatch(addTask(task));
      setTask({ title: "", description: "", dueDate: "" });
    }
  };
  return (
    <div>
      <Paper sx={{ p: 3, mb: 0 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Task Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
            <TextField
              label="Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              multiline
              rows={2}
            />
            <TextField
              type="date"
              label="Due Date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" type="submit" className="addTask">
              Add Task
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default TaskForm;
