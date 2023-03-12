export const prepareDatePropertyInArray = (array, property) => {
  const clientsPrepared = array.map(item => {
    if(item[property]){
      const datePrepared = new Date(item[property]).toISOString().split('T')[0]
      item[property] = datePrepared
      return item
    }
    return item
  })
  return clientsPrepared
}

export const prepareDatePropertyInObject = (object, property) => {
  if(object[property]){
    return new Date(object[property]).toISOString().split('T')[0]
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