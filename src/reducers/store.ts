import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileReducer';
import mouseReducer from './mouseReducer';
import toolsReducer from './toolsReducer';
// ...

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    mouse: mouseReducer,
    file: fileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
