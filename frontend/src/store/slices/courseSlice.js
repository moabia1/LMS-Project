import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourse:null
  },
  reducers: {
    setCreatorCourse: (state, action) => {
      state.creatorCourse = action.payload
    }
  }
})

export const { setCreatorCourse } = courseSlice.actions;
export default courseSlice.reducer