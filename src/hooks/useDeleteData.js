import Swal from "sweetalert2"
import { deleteData } from "../api/general"
import { CLIENTS } from "../utils/constants"

export const useDeleteData = async(route, id) => {
  const response = await deleteData(route, id)
  console.log('response', response)
  if(response?.ok && !response?.error){
    const { msn } = response
    Swal.fire({
      title: 'Success!',
      text: msn,
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    }).then(result => {
      removeDataFromSS(route, id)
      window.location.reload()
    })
  }else if(response?.error){
    const { msn } = response
    Swal.fire({
      title: 'Error!',
      text: msn,
      icon: "error",
      showConfirmButton: false,
      timer: 2000
    })
  }else {
    Swal.fire({
      title: 'Error!',
      text: response?.[0]?.msg,
      icon: "error",
      showConfirmButton: false,
      timer: 2000
    })
  }
}

const removeDataFromSS = (route, id) => {
  const dataInSS = JSON.parse(sessionStorage.getItem(route) || '[]')
  const dataFiltered = dataInSS.filter(data => data._id !== id)
  sessionStorage.setItem(route, JSON.stringify(dataFiltered))
}

CLIENTS