import { apiInstance } from "../axiosInstance"
import { ESTIMATED_PRICES, GOLDEN_PRICE } from "../../utils/constants"
import { prepareDatePropertyInArray } from "../../utils/functions"

export const getEstimatedPrices = async() => {
  try {
    const config = {
      method: 'get',
      url: '/estimate',
      headers: { 'Content-Type': 'application/json' }
    }
    const { data: { estimatedPrices } } = await apiInstance(config)
    const estimatedPricesPrepared = prepareDatePropertyInArray(estimatedPrices, 'createdAt')
    sessionStorage.setItem(ESTIMATED_PRICES, JSON.stringify(estimatedPricesPrepared))
    return {
      ok: true,
      estimatedPrices: estimatedPricesPrepared,
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

export const createEstimate = async (body) => {
  try {    
    const config = {
      method: 'post',
      url: '/estimate/create',
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify(body)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error creating estimate', error)
    return error.response.data.errors[0]
  }
}

export const updateEstimate = async (estimateId, body) => {
  try {    
    const config = {
      method: 'put',
      url: `/estimate/edit/${estimateId}`,
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify(body)
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error updating estimate', error)
    return error.response.data.errors[0]
  }
}

export const getEstimatePriceById = async (id = '') => {
  try {    
    const config = {
      method: 'get',
      url: `/estimate/${id}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data: { estimatedPrice } } = await apiInstance(config)
    return estimatedPrice
  } catch (error) {
    console.log('Error creating estimate', error)
    return error.response.data.errors[0]
  }
}

export const getMetalPrice = async() => {
  try {
    const config = {
      method: 'get',
      url: '/metals-price/get-prices',
      headers: { 'Content-Type': 'application/json' }
    }
    const { data: { metals } } = await apiInstance(config)
    const gold = metals.find(metal => metal.symbol === GOLDEN_PRICE)
    sessionStorage.setItem(GOLDEN_PRICE, JSON.stringify(gold))
    return {
      ok: true,
      gold
    }
  } catch (error) {
    console.log('Error getMetalPrice', error)
    const errorMsn =  error.response.data.errors
    return {
      ok: false,
      msn: errorMsn,
    }
  }
}