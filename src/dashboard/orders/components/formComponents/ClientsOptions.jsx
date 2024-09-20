import React, { useEffect } from 'react'
import { SelectInputContainer } from '../../../../components/form'
import { CLIENTS } from '../../../../utils/constants'
import { sortArray } from '../../../../utils/functions'

export const ClientsOptions = ({client, setClient, disabled, required}) => {
  const clientsOPtions = JSON.parse(sessionStorage.getItem(CLIENTS) || "[]")

  console.log("clientsOPtions", sortArray(clientsOPtions, "name"))

  useEffect(() => {
    if(client){
      setClient(client)
    }
  }, [client])
  

  return (
    <SelectInputContainer
      name="client"
      text="Client"
      value={client}
      setValue={setClient}
      disabled={disabled}
      required={required}
    >
      <option value="">-- Client --</option>
      {
        sortArray(clientsOPtions, "name").map(clientOption => (
          <option value={clientOption.name} key={clientOption._id}>
            {clientOption.name}
          </option>
        ))
      }
    </SelectInputContainer>
  )
}
