import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loggedInUser: null,
  error: ""
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    checkUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);
      user ? state.loggedInUser = user : state.error = "Invalid email or password"
      if(state.loggedInUser) state.error = null;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      state.users[index] = action.payload;
      state.loggedInUser = action.payload;
    },
    deleteUser: (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      state.users.splice(index, 1);
    },
  },
});

export const { addUser, checkUser, logout, updateUser, deleteUser } = userSlice.actions;
export const selectLoggedInUser = (state) => state.users.loggedInUser;
export const allUsers = (state) => state.users.users;
export const getUsersError = (state) => state.users.error;

export default userSlice.reducer;
