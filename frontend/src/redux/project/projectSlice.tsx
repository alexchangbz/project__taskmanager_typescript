import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get Projects
export const getProjects = createAsyncThunk('projects/getAll', async (_, thunkAPI: any) => {
    try {
        return await projectService.getProjects()
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create Project
export const createProject = createAsyncThunk('projects/create', async (projectData: any, thunkAPI: any) => {
    try {
        return await projectService.createProject(projectData)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit Project
export const editProject = createAsyncThunk('projects/edit', async (projectData: any, thunkAPI: any) => {
    try {
        console.log(projectData, "PROJECT DATA")
        return await projectService.editProject(projectData)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Projects
export const deleteProject = createAsyncThunk('projects/delete', async (id: any, thunkAPI: any) => {
    try {
        return await projectService.deleteProject(id)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = action.payload.reverse()
            })
            .addCase(getProjects.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createProject.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects.unshift(action.payload)
            })
            .addCase(createProject.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProject.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(deleteProject.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = state.projects.filter((project: any) => project._id !== action.payload.id)
            })
            .addCase(deleteProject.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editProject.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(editProject.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(editProject.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer