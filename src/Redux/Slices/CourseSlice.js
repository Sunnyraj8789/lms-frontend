import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";


const initialState = {
  coursesData: [],
};

// function to get all courses
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "Loading courses data...",
      success: "Courses loaded successfully",
      error: "Failed to get courses",
    });

    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to create a new course
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      // creating the form data from user data
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const response = axiosInstance.post("/courses", formData);

      toast.promise(response, {
        loading: "Creating the course...",
        success: "Course created successfully",
        error: "Failed to create course",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`courses/${id}`);
    toast.promise(response, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to update the course details
export const updateCourse = createAsyncThunk("/course/update", async (data) => {
  try {
    // creating the form data from user data
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("description", data.description);
    // backend is not allowing change of thumbnail
    // if (data.thumbnail) {
    //   formData.append("thumbnail", data.thumbnail);
    // }

    const res = axiosInstance.put(`/courses/${data.id}`, {
      title: data.title,
      category: data.category,
      createdBy: data.createdBy,
      description: data.description,
    });

    toast.promise(res, {
      loading: "Updating the course...",
      success: "Course updated successfully",
      error: "Failed to update course",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        
        state.courseData = [...action.payload];
      }
    });
  },
});

// export const {} = courseSlice.actions;
export default courseSlice.reducer;
