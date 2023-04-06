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

export const getInvoiceByClientName = async(clientName) => {
  try {
    const config = {
      method: 'get',
      url: `/invoice/client/${clientName}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    const {errors} = error.response.data
    console.log('Error getting invoice by client name', errors)
    return errors
  }
};

export const getInvoiceById = async(invoiceId) => {
  try {
    const config = {
      method: 'get',
      url: `/invoice/${invoiceId}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    const {errors} = error.response.data
    console.log('Error getting invoice by id', errors)
    return errors
  }
};

export const editInvoiceById = async(invoiceId, body) => {
  try {
    const config = {
      method: 'put',
      url: `/invoice/edit/${invoiceId}`,
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify(body)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    const {errors} = error.response.data
    console.log('Error editing invoice by id', errors)
    return errors
  }
}