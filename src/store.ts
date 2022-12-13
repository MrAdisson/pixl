import { configureStore } from '@reduxjs/toolkit';
import mouseReducer from './reducers/mouseReducer';
import toolsReducer from './reducers/toolsReducer';
// ...

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    mouse: mouseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
