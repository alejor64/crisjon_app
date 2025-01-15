import { apiInstance } from "../axiosInstance"

export const deleteData = async (route, id) => {
  try {
    const config = {
      method: 'delete',
      url: `${route}/delete/${id}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    const {errors} = error.response.data
    console.log('Error', errors)
    return errors
  }
}