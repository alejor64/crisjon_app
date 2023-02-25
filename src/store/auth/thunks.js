import { checkingCredentials, login, logout } from "./authSlice"
import { loginWithEmailAndPassword, reviewToken } from "../../api/auth"

export const checkingAuth = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startLoginWithEmailAndPassword = ({userEmail, userPassword}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const response = await loginWithEmailAndPassword({userEmail, userPassword})
    if(!response.ok) return dispatch(logout(response))
    dispatch(login(response))
  }
}

export const startLoginWithToken = (tokenInLS) => {
  return async (dispatch) => {
    if(!tokenInLS) return dispatch(logout())
    const response = await reviewToken(tokenInLS)
    dispatch(login(response))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout())
  }
}