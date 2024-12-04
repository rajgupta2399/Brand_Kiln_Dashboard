import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "store/taskSlice";
import { TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 3,
        p: 2,
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Paper>
  );
};

export default SearchBar;
