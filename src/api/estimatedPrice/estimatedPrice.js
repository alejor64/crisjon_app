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