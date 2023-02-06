import { ITEMS } from "../../../utils/constants";
import { apiInstance } from "../../axiosInstance";

export const getAllItems = async () => {
  try {
    const config = {
      method: 'get',
      url: '/order-items/',
      headers: { 'Content-Type': 'application/json' }
    };
    const { data: { orderItems } } = await apiInstance(config)
    sessionStorage.setItem(ITEMS, JSON.stringify(orderItems))
    return orderItems
  } catch (error) {
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}