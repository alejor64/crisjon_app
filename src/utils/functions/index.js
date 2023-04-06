import moment from 'moment'
import { USA_DATE_FORMAT } from '../constants'

export const prepareDatePropertyInArray = (array, property) => {
  const clientsPrepared = array.map(item => {
    if(item[property]){
      const datePrepared = moment(item[property]).format(USA_DATE_FORMAT);
      item[property] = datePrepared
      return item
    }
    return item
  })
  return clientsPrepared
}

export const prepareDatePropertyInObject = (object, property) => {
  if(object[property]){
    return moment(object[property]).format(USA_DATE_FORMAT)
  }
}

export const addValueToSS = (key, value) => {
  const arrayOdDataInSS = JSON.parse(sessionStorage.getItem(key) || '[]')
  arrayOdDataInSS.unshift(value)
  sessionStorage.setItem(key, JSON.stringify(arrayOdDataInSS))
}

export const updateValueInSS = (key, value) => {
  const arrayOdDataInSS = JSON.parse(sessionStorage.getItem(key) || '[]')
  const arrayUpdated = arrayOdDataInSS.map(item => {
    if(item._id === value._id) return value
    return item
  })
  sessionStorage.setItem(key, JSON.stringify(arrayUpdated))
}

export const difference = (obj1, obj2) => {
  let keyFound = false;
  Object.keys(obj1).forEach(key => {
    if(obj1[key] !== obj2[key]) keyFound = true
  });
  return keyFound;
};

const propertySearch = (property, property_value) => {
  if(typeof property === 'string') {
    return property.toLowerCase().includes(property_value)
  }else if(typeof property === 'number') {
    return toString(property).toLowerCase().includes(property_value)
  }
}

export const searchValue = (property_value, array) => {
  let new_array = [];
  array.map(obj => {
    Object.keys(obj).map(key => {
      const includeProperty = propertySearch(obj[key], property_value.toLowerCase())
      if(includeProperty){
        const valueInArray = new_array.find(property => property._id === obj._id)
        if(!valueInArray){
          return new_array.push(obj)
        }
      }
    })
  })
  return new_array;
};

export const numberWithDots = (x) => (x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : x !== 0 ? '' : '0');

export const formatCurrency = (value) => (value ? `$${numberWithDots(Math.round(value))}` : `$ 0`);