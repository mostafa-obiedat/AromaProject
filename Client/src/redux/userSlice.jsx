import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
    try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        return {
            user: user && user !== "undefined" ? JSON.parse(user) : null,
            token: token && token !== "undefined" ? token : null,
        };
    } catch (error) {
        console.error("Error loading initial state from localStorage:", error);
        return {
            user: null,
            token: null,
        };
    }
};

const initialState = loadInitialState();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;