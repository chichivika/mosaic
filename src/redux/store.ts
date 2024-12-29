import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice';
import dndReducer from './dnd/dndSlice';

const store = configureStore({
    reducer: {
        board: boardReducer,
        dnd: dndReducer,
    },
});

export default store;
export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getCurrentState = () => store.getState();
