import { createSlice } from "@reduxjs/toolkit";
import { NOT_AUTHENTICATED, AUTHENTICATED, CHECKING } from "../../utils/constants";


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: NOT_AUTHENTICATED,
    name: null,
    role: null,
    token: null,
    errorMessages: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = AUTHENTICATED
      state.name = payload.name
      state.role = payload.role
      state.token = payload.token
      state.errorMessages = null
    },
    logout: (state, { payload }) => {
        state.status = NOT_AUTHENTICATED
        state.name = null
        state.role = null
        state.token = null
        state.errorMessages = payload?.errorMessages
    },
    checkingCredentials: (state) => {
      state.status = CHECKING
    },
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;