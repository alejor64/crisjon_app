import { apiInstance } from "../axiosInstance"
import { ORDERS } from "../../utils/constants"
import { prepareDatePropertyInArray, prepareDatePropertyInObject } from "../../utils/functions"

export const getOrders = async () => {
  try {
    const config = {
      method: 'get',
      url: '/order',
      headers: { 'Content-Type': 'application/json' }
    }
    const { data: { orders } } = await apiInstance(config)
    const createdAtPrepared = prepareDatePropertyInArray(orders, 'createdAt')
    const lastModificatedAtPrepared = prepareDatePropertyInArray(createdAtPrepared, 'lastModificatedAt')
    const deliveredDatePrepared = prepareDatePropertyInArray(lastModificatedAtPrepared, 'deliveredDate')
    sessionStorage.setItem(ORDERS, JSON.stringify(deliveredDatePrepared))
    return {
      ok: true,
      orders: deliveredDatePrepared,
    }
  } catch (error) {
    console.log('Error getOrders', error)
    const errorMsn =  error.response.data.errors
    return {
      ok: false,
      msn: errorMsn,
    }
  }
}

export const getOrdersById = async (id) => {
  try {
    const config = {
      method: 'get',
      url: `/order/${id}`,
      headers: { 'Content-Type': 'application/json' }
    };
    const { data: { order } } = await apiInstance(config)
    order.createdAt = prepareDatePropertyInObject(order, 'createdAt')
    order.lastModificatedAt = prepareDatePropertyInObject(order, 'lastModificatedAt')
    order.deliveredDate = prepareDatePropertyInObject(order, 'deliveredDate')
    order.dueDate = prepareDatePropertyInObject(order, 'dueDate')
    order.paymentDate = prepareDatePropertyInObject(order, 'paymentDate')
    return order
  } catch (error) {
    console.log('Error getOrdersById', error)
    const errorMsn =  error.response.data.errors
    return {
      ok: false,
      msn: errorMsn,
    }
  }
}

export const getOrdersDelivered = async(clientName, startDate, endDate) => {
  try {
    const uri = `/order/client-name/${clientName}?startDate=${startDate}&endDate=${endDate}`
    const config = {
      method: 'get',
      url: uri,
      headers: { 'Content-Type': 'application/json' }
    }
    const { data: { orders } } = await apiInstance(config)
    const createdAtPrepared = prepareDatePropertyInArray(orders, 'createdAt')
    const deliveredDatePrepared = prepareDatePropertyInArray(createdAtPrepared, 'deliveredDate')
    return {
      ok: true,
      orders: deliveredDatePrepared,
    }
  } catch (error) {
    console.log('Error getOrdersDelivered', error)
    const errorMsn =  error.response.data.errors
    return {
      ok: false,
      msn: errorMsn,
    }
  }
}

export const createOrder = async (body) => {
  try {    
    const config = {
      method: 'post',
      url: '/order/create',
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify(body)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error creating order', error)
    return error.response.data.errors
  }
}

export const updateOrder = async (id, order) => {
  try {    
    const config = {
      method: 'put',
      url: `/order/edit/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify(order)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error updateOrder', error)
    const errorMsn =  error.response.data.errors
    return {
      ok: false,
      msn: errorMsn,
    }
  }
}