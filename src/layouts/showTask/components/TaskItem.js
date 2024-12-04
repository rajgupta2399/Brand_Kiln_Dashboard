import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTask, toggleComplete, editTask } from "store/taskSlice";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleEdit = () => {
    dispatch(editTask(editedTask));
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    setDeleteDialog(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Checkbox
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
              />
              {!editMode ? (
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: task.completed ? "line-through" : "none" }}
                  >
                    {task.title}
                  </Typography>
                  <Typography variant="body2">{task.description}</Typography>
                  {task.dueDate && <Typography variant="caption">Due: {task.dueDate}</Typography>}
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <TextField
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    size="small"
                  />
                  <TextField
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    size="small"
                    multiline
                  />
                  <TextField
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    size="small"
                  />
                </Box>
              )}
            </Box>
            <Box>
              {!editMode ? (
                <>
                  <IconButton onClick={() => setEditMode(true)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => setDeleteDialog(true)}>
                    <Delete />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button onClick={handleEdit}>Save</Button>
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskItem;
