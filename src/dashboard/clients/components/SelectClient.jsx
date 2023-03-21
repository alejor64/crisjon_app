import { useEffect } from "react"
import { Select } from "../../../components/form"
import { CLIENTS } from "../../../utils/constants"

export const SelectClient = ({name, client, setClient}) => {
  const clientsOptions = JSON.parse(sessionStorage.getItem(CLIENTS) || "[]")

  useEffect(() => {
    if(client){
      setClient(client)
    }
  }, [client])
  

  return (
    <Select
      name={name}
      value={client}
      setValue={setClient}
    >
      <option value="">-- Client --</option>
      {
        clientsOptions.map(clientOption => (
          <option value={clientOption.name} key={clientOption._id}>
            {clientOption.name}
          </option>
        ))
      }
    </Select>
  )
}
