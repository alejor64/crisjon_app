import { useEffect, useState } from "react"
import { getOrdersDelivered } from "../../../../api/orders"
import { Filter } from "../../../../components/filter"
import { ClientError, DateError } from "../../../../components/filter/errors"
import { InputLabelContainer, Label } from "../../../../components/form"
import { SelectClient } from "../../../clients/components"

export const InvoiceFilters = ({startDate, setStartDate, endDate, setEndDate, client, setClient, setOrders}) => {
  const [errorMsn, setErrorMsn] = useState(<></>)
  const onClick = () => {
    if(!client){
      setErrorMsn(<ClientError />)
    }else if(startDate && endDate && startDate > endDate){
      setErrorMsn(<DateError />)
    }else{
      setErrorMsn(<></>)
      setOrders([])
      const clientePrepared = client.replaceAll(' ', '%20')
      getOrdersDelivered(clientePrepared, startDate, endDate)
        .then(response => setOrders(response.orders))
    }
  };

  useEffect(() => {
    if(!client) setOrders([])
  }, [client])
  

  return (
    <Filter errorMsn={errorMsn} onClick={onClick}>
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
          inputValue={endDate}
          setInputValue={setEndDate}
        />
      </div>
      <div className="w-1/5 flex flex-col text-center">
        <Label htmlFor="clients" text="Client" />
        <SelectClient
          name="clients"
          client={client}
          setClient={setClient}
          required={true}
        />
      </div>
    </Filter>
  )
}
