import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats.push(action.payload);
    }
  },
});

export const { addChat } = chatSlice.actions;
export const fetchAllChats = (state) => state.chats.chats;

export default chatSlice.reducer;
