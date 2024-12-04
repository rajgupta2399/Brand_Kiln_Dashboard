import { createSlice } from "@reduxjs/toolkit";

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("tasksState");
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
  }
  return {
    tasks: [],
    filter: "all",
    searchQuery: "",
  };
};

// Initial state
const initialState = loadStateFromLocalStorage();

// Redux slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveStateToLocalStorage(state); // Save state after adding a task
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        saveStateToLocalStorage(state); // Save state after editing a task
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveStateToLocalStorage(state); // Save state after deleting a task
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveStateToLocalStorage(state); // Save state after toggling completion
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveStateToLocalStorage(state); // Save state after filter change
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      saveStateToLocalStorage(state); // Save state after setting search query
    },
  },
});

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    localStorage.setItem("tasksState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
};

// Export actions and reducer
export const { addTask, editTask, deleteTask, toggleComplete, setFilter, setSearchQuery } =
  taskSlice.actions;
export default taskSlice.reducer;
