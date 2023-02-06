import { USERS } from "../../utils/constants";
import { prepareDatePropertyInArray } from "../../utils/functions";
import { apiInstance } from "../axiosInstance";

export const getUsers = async () => {
  try {
    const config = {
      method: 'get',
      url: '/user',
      headers: { 'Content-Type': 'application/json' },
    };
    const { data: { users } } = await apiInstance(config)
    const createdAtPrepared = prepareDatePropertyInArray(users, 'createdAt')
    sessionStorage.setItem(USERS, JSON.stringify(createdAtPrepared))
    return createdAtPrepared
  } catch (error) {
    console.log('Error in getUsers', error)
  }
}

export const getUserById = async (id) => {
  try {
    const config = {
      method: 'get',
      url: `/user/${id}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data: { user } } = await apiInstance(config)
    return user
  } catch (error) {
    console.log('Error in getUserById', error)
  }
}

export const createUser = async (user) => {
  try {
    const config = {
      method: 'post',
      url: `/user/singup`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(user)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error in updateUser', error)
  }
}

export const updateUser = async (id, user) => {
  try {
    const config = {
      method: 'put',
      url: `/user/edit/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(user)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error in updateUser', error)
  }
}