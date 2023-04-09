import { useEffect, useState } from "react"
import moment from "moment"
import Swal from 'sweetalert2'
import { getInvoiceByClientName } from "../../../../api/invoice"
import { getOrdersDelivered } from "../../../../api/orders"
import { Filter } from "../../../../components/filter"
import { ClientError, DateError } from "../../../../components/filter/errors"
import { InputLabelContainer, Label } from "../../../../components/form"
import { SelectClient } from "../../../clients/components"
import { USA_DATE_FORMAT } from "../../../../utils/constants"

export const InvoiceFilters = ({startDate, setStartDate, endDate, setEndDate, client, setClient, setOrders, setCreateInvoice, createInvoice, setInvoices}) => {
  const [errorMsn, setErrorMsn] = useState(<></>)

  const onClick = () => {
    if(!client){
      setErrorMsn(<ClientError />)
    }else if(startDate && endDate && startDate > endDate){
      setErrorMsn(<DateError />)
    }else if(!createInvoice) {
      setErrorMsn(<></>)
      setInvoices([])
      const clientName = client.replaceAll(' ', '%20')
      getInvoiceByClientName(clientName, startDate, endDate)
        .then(setInvoiceWithResponse)
    }else{
      setErrorMsn(<></>)
      setOrders([])
      const clientName = client.replaceAll(' ', '%20')
      getOrdersDelivered(clientName, startDate, endDate)
        .then(setOrdersWithResponse)
    }
  };

  const setOrdersWithResponse = (response) => {
    if(response?.orders?.length > 0) setOrders(response.orders)
    if(response?.orders?.length === 0) {
      const startDateFormated = moment(startDate).format(USA_DATE_FORMAT)
      const endDateFormated = moment(endDate).format(USA_DATE_FORMAT)
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        html: `There's no order for ${client} between <br> ${startDateFormated} and ${endDateFormated}`,
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  const setInvoiceWithResponse = (response) => {
    if(response?.invoices?.length > 0) setInvoices(response.invoices)
    if(response?.invoices?.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        html: `There's no invoices for ${client}`,
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

  useEffect(() => {
    if(!client) {
      setOrders([])
      setInvoices([])
    }
  }, [client])
  

  return (
    <Filter errorMsn={errorMsn} onClick={onClick}>
      <div className="flex flex-col w-full">
        <div className="mb-3 flex justify-around">
          <div className="flex items-center">
            <span className='mr-1'>Create invoice</span>
            <input
              type="checkbox"
              id="createInvoice"
              name="createInvoice"
              checked={createInvoice}
              onChange={() => setCreateInvoice(!createInvoice)}
            />
          </div>
          <div className="flex items-center">
            <span className='mr-1'>Show invoices</span>
            <input
              type="checkbox"
              id="createInvoice"
              name="createInvoice"
              checked={!createInvoice}
              onChange={() => setCreateInvoice(!createInvoice)}
            />
          </div>
        </div>
        <div className="flex justify-around">
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
        </div>
      </div>
    </Filter>
  )
}
