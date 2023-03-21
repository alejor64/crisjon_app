import { apiInstance } from "../axiosInstance"

export const createInvoice = async(body) => {
  try {
    const config = {
      method: 'post',
      url: '/invoice/create',
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify(body)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    const {errors} = error.response.data
    console.log('Error creating invoice', errors)
    return errors
  }
};