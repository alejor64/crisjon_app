import { apiInstance } from "../axiosInstance"
import { CLIENTS } from "../../utils/constants"
import { prepareDatePropertyInArray, prepareDatePropertyInObject } from "../../utils/functions"

export const getAllClients = async () => {
  try {
    const config = {
      method: 'get',
      url: '/client',
      headers: { 'Content-Type': 'application/json' }
    }
    const { data: { clients } } = await apiInstance(config)
    const createdAtPrepared = prepareDatePropertyInArray(clients, 'createdAt')
    const lastModificatedAtPrepared = prepareDatePropertyInArray(createdAtPrepared, 'lastModificatedAt')
    sessionStorage.setItem(CLIENTS, JSON.stringify(lastModificatedAtPrepared))
    return {
      ok: true,
      clients: lastModificatedAtPrepared,
    }
  } catch (error) {
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}

export const getClientById = async (id) => {
  try {
    const config = {
      method: 'get',
      url: `/client/${id}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data: { msn, client } } = await apiInstance(config)
    client.createdAt = prepareDatePropertyInObject(client, 'createdAt')
    client.lastModificatedAt = prepareDatePropertyInObject(client, 'lastModificatedAt')
    return { msn, client }
  } catch (error) {
    console.log('Error in getClientById', error)
  }
}

export const createClient = async (client) => {
  try {
    const clientInfo = JSON.stringify({
      name: client.name,
      address: client.address,
      phone: client.phone,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      favorite: client.favorite,
      email: client.email,
      fein: client.fein,
      sst: client.sst,
      taxIdNumber: client.taxtIdNumber,
      createdAt: client.createdAt,
    });
    const config = {
      method: 'post',
      url: '/client/create',
      headers: { 'Content-Type': 'application/json' },
      data : clientInfo
    };
    const { data  } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error in createClient', error)
  }
}

export const updateClient = async (id, client) => {
  try {
    const clientInfo = JSON.stringify({
      name: client.name,
      address: client.address,
      phone: client.phone,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      favorite: client.favorite,
      email: client.email,
      fein: client.fein,
      sst: client.sst,
      taxIdNumber: client.taxtIdNumber,
      createdAt: client.createdAt,
    });
    
    const config = {
      method: 'put',
      url: `/client/edit/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data : clientInfo
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('ERROR', error)
  }
}