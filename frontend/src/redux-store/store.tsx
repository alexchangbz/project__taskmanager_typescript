import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../redux/project/projectSlice"
import detailReducer from "../redux/detail/detailSlice";
import subTaskReducer from "../redux/subtask/subTaskSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        detail: detailReducer,
        subtask: subTaskReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch