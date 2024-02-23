import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./users/usersSlice";
import chatReducer from "./chats/chatsSlice";
import uploadReducer from "./uploads/uploadsSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    chats: chatReducer,
    uploads: uploadReducer,
  },
});
