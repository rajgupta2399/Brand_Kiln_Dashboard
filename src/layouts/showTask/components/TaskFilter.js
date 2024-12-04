import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import { setFilter } from "store/taskSlice";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={(e, value) => value && dispatch(setFilter(value))}
        fullWidth
        sx={{
          "& .MuiToggleButton-root": {
            borderRadius: "8px",
            textTransform: "capitalize",
          },
          "& .Mui-selected": {
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          },
        }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="pending">Pending</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
        <ToggleButton value="overdue">Overdue</ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default TaskFilters;
