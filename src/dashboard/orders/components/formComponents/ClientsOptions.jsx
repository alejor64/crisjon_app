import React, { useEffect } from 'react'
import { SelectInputContainer } from '../../../../components/form'
import { CLIENTS } from '../../../../utils/constants'

export const ClientsOptions = ({client, setClient, disabled}) => {
  const clientsOPtions = JSON.parse(sessionStorage.getItem(CLIENTS) || "[]")

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
    >
      <option value="">-- Client --</option>
      {
        clientsOPtions.map(clientOption => (
          <option value={clientOption.name} key={clientOption._id}>
            {clientOption.name}
          </option>
        ))
      }
    </SelectInputContainer>
  )
}
