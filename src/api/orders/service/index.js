import { SERVICES } from "../../../utils/constants";
import { apiInstance } from "../../axiosInstance";

export const getAllServices = async () => {
  try {
    const config = {
      method: 'get',
      url: '/order-services/',
      headers: { 'Content-Type': 'application/json' }
    };
    const { data: { orderServices } } = await apiInstance(config)
    sessionStorage.setItem(SERVICES, JSON.stringify(orderServices))
    return orderServices
  } catch (error) {
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}