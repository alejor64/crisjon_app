import { TOKEN } from "../../utils/constants";
import { apiInstance } from "../axiosInstance";

export const loginWithEmailAndPassword = async({userEmail, userPassword}) => {
  try {    
    const config = {
      method: 'post',
      url: '/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "email": userEmail,
        "password": userPassword
      })
    };
    const { data } = await apiInstance(config)
    const { name, role, token } = data.user
    localStorage.setItem(TOKEN, token)

    return {
      ok: true,
      name,
      role,
      token,
    }
  } catch (error) {
    return {
      ok: false,
      errorMessages: "Email or password is incorrect"
    }
  }
};

export const reviewToken = async(tokenInLS) => {
  try {
    const config = {
      method: 'get',
      url: '/token/review',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ "token": tokenInLS })
    };
    const { data } = await apiInstance(config)
    const { name, role, token } = data.user

    return {
      ok: true,
      name,
      role,
      token,
    }
  } catch (error) {
    localStorage.clear()
    return {
      ok: false,
      errorMessages: "Token is invalid"
    }
  }
}