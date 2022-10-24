import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subTaskService from './subTaskService';

const initialState = {
    subtasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get Parent's SubTasks 
export const getParentSubTasks = createAsyncThunk('subtasks/id', async (id: any, thunkAPI: any) => {
    try {
        return await subTaskService.getParentSubTasks(id)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create Sub Task
export const createSubTask = createAsyncThunk('subtasks/create', async (subtaskData: any, thunkAPI: any) => {
    try {
        return await subTaskService.createSubTask(subtaskData)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit Sub Task
export const editSubTask = createAsyncThunk('subtasks/edit', async (subtaskData: any, thunkAPI: any) => {
    try {
        return await subTaskService.editSubTask(subtaskData)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Sub Task
export const deleteSubTask = createAsyncThunk('subtasks/delete', async (id: any, thunkAPI: any) => {
    try {
        return await subTaskService.deleteSubTask(id)
    } catch (error: any) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const subtaskSlice = createSlice({
    name: 'subtask',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getParentSubTasks.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(getParentSubTasks.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.subtasks = action.payload
            })
            .addCase(getParentSubTasks.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createSubTask.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(createSubTask.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.subtasks.push(action.payload)
            })
            .addCase(createSubTask.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editSubTask.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(editSubTask.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(action.payload, "EDIT SUB TASK PAYLOAD")
            })
            .addCase(editSubTask.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteSubTask.pending, (state: any) => {
                state.isLoading = true
            })
            .addCase(deleteSubTask.fulfilled, (state: any, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.subtasks = state.subtasks.filter((subtask: any) =>subtask._id !== action.payload.id)
            })
            .addCase(deleteSubTask.rejected, (state: any, action: any) => {
                state.isLoading = false
                state.isError = true
                console.log(action.payload, "DELETE FAIL")
                state.message = action.payload
            })
    }
})

export const { reset } = subtaskSlice.actions
export default subtaskSlice.reducer