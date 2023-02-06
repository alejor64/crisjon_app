import { useEffect } from "react"
import { Filter } from "../../../../components/filter"
import { Checkbox, InputLabelContainer, Label, Select, SelectInputContainer } from "../../../../components/form"
import { CLIENTS } from "../../../../utils/constants"

const ClientsOptions = ({client, setClient}) => {
  const clientsOPtions = JSON.parse(sessionStorage.getItem(CLIENTS) || "[]")

  useEffect(() => {
    if(client){
      setClient(client)
    }
  }, [client])
  

  return (
    <Select
      name="client"
      value={client}
      setValue={setClient}
    >
      <option value="">-- Client --</option>
      {
        clientsOPtions.map(clientOption => (
          <option value={clientOption.name} key={clientOption._id}>
            {clientOption.name}
          </option>
        ))
      }
    </Select>
  )
}

export const OrderFilters = ({doneCheckbox, setDoneCheckbox, returnedCheckbox, setReturnedCheckbox, startDate, setStartDate, endDateValue, setEndDateValue, clientValue, setClientValue, onClick, error}) => {

  return (
    <Filter onClick={onClick} error={error}>
      <div>
        <Checkbox
          checked={doneCheckbox}
          setChecked={setDoneCheckbox}
          inputCss="flex flex-col-reverse"
          text="Done orders"
          textCss="mb-1"
        />
      </div>
      <div className="w-1/5">
        <InputLabelContainer
          type="date"
          text="Start date"
          name="start_date"
          css="flex flex-col text-center px-2"
          inputValue={startDate}
          setInputValue={setStartDate}
        />
      </div>
      <div className="w-1/5">
        <InputLabelContainer
          type="date"
          text="End date"
          name="end_date"
          css="flex flex-col text-center px-2"
          inputValue={endDateValue}
          setInputValue={setEndDateValue}
        />
      </div>
      <div className="w-1/5 flex flex-col text-center">
        <Label htmlFor="client" text="Client" />
        <ClientsOptions name="clients" client={clientValue} setClient={setClientValue}/>
      </div>
      <div>
        <Checkbox
          checked={returnedCheckbox}
          setChecked={setReturnedCheckbox}
          inputCss="flex flex-col-reverse"
          text="Delivered orders"
          textCss="mb-1"
        />
      </div>
    </Filter>
  )
}
