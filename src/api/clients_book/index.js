import { apiInstance } from "../axiosInstance"
import { CLIENTS_BOOK } from "../../utils/constants"
import { prepareDatePropertyInArray, prepareDatePropertyInObject } from "../../utils/functions"

export const getAllClientsBook = async () => {
  try {
    const config = {
      method: 'get',
      url: '/client-book',
      headers: { 'Content-Type': 'application/json' }
    }
    const { data: { clients } } = await apiInstance(config)
    const createdAtPrepared = prepareDatePropertyInArray(clients, 'createdAt')
    const lastModificatedAtPrepared = prepareDatePropertyInArray(createdAtPrepared, 'lastModificatedAt')
    sessionStorage.setItem(CLIENTS_BOOK, JSON.stringify(lastModificatedAtPrepared))
    return {
      ok: true,
      clients: lastModificatedAtPrepared,
    }
  } catch (error) {
    console.log('Error in getAllClientsBook', error)
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}

export const getClientBookById = async (id) => {
  try {
    const config = {
      method: 'get',
      url: `/client-book/${id}`,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data: { msn, client } } = await apiInstance(config)
    client.createdAt = prepareDatePropertyInObject(client, 'createdAt')
    client.lastModificatedAt = prepareDatePropertyInObject(client, 'lastModificatedAt')
    return { msn, client }
  } catch (error) {
    console.log('Error in getClientBookById', error)
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}

export const createClientBook = async (client) => {
  try {
    const clientInfo = JSON.stringify({
      name: client.name,
      phone: client.phone,
      email: client.email,
      bookPage: client.bookPage,
    });
    const config = {
      method: 'post',
      url: '/client-book/create',
      headers: { 'Content-Type': 'application/json' },
      data : clientInfo
    };
    const { data  } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('Error in createClientBook', error)
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}

export const updateClientBook = async (id, client) => {
  try {
    const clientInfo = JSON.stringify({
      name: client.name,
      phone: client.phone,
      email: client.email,
      bookPage: client.bookPage,
    });
    
    const config = {
      method: 'put',
      url: `/client-book/edit/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data : clientInfo
    };
    const { data } = await apiInstance(config)
    return data
  } catch (error) {
    console.log('ERROR in updateClientBook', error)
    return {
      ok: false,
      msn: 'Bad Request',
    }
  }
}