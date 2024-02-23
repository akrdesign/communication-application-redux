import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploads: [],
};

export const uploadSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    addUploads: (state, action) => {
      state.uploads.push(action.payload);
    },
    deleteUpload: (state, action) => {
      const index = state.uploads.findIndex((d) => d.id === action.payload.id);
      state.uploads.splice(index, 1);
    },
    updateUpload: (state, action) => {
      const {description, uploadIndex} = action.payload;
      const updatedUploads = [...state.uploads];
      updatedUploads[uploadIndex].description = description;
    },
    addShareUpload: (state, action) => {
      state.uploads = action.payload
    }
  },
});

export const { addUploads, deleteUpload, updateUpload, addShareUpload } = uploadSlice.actions;
export const fetchAllUploads = (state) => state.uploads.uploads;

export default uploadSlice.reducer;
