import { useEffect, useState } from 'react'
import moment from 'moment'
import { DashboardLayout } from '../../layout'
import { InvoiceFilters } from '../components'
import { MONTH, DATA_PICKER_FORMAT } from '../../../utils/constants'
import { CreateInvoice } from './CreateInvoice'
import InvoicesList from './InvoicesList'

export const InvoicePage = () => {
  const [startDate, setStartDate] = useState(moment().startOf(MONTH).format(DATA_PICKER_FORMAT))
  const [endDate, setEndDate] = useState(moment().endOf(MONTH).format(DATA_PICKER_FORMAT))
  const [client, setClient] = useState("")
  const [orders, setOrders] = useState([])
  const [ordersChecked, setOrdersChecked] = useState([])
  const [invoices, setInvoices] = useState([])
  const [invoiceNumber, setInvoiceNumber] = useState(0)
  const [createInvoice, setCreateInvoice] = useState(true)

  useEffect(() => {
    if(!client) setOrdersChecked([])
  }, [client])

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="-3xl text-center my-2">
            INVOICE
          </h2>
          <InvoiceFilters
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            client={client}
            setClient={setClient}
            setOrders={setOrders}
            setCreateInvoice={setCreateInvoice}
            createInvoice={createInvoice}
            setInvoices={setInvoices}
          />
          <div className='"py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8'>
            {
              (client && createInvoice) &&
                <CreateInvoice
                  orders={orders}
                  setOrdersChecked={setOrdersChecked}
                  ordersChecked={ordersChecked}
                  invoiceNumber={invoiceNumber}
                  setInvoiceNumber={setInvoiceNumber}
                  startDate={startDate}
                  endDate={endDate}
                  client={client}
                />
            }
            {
              (client && !createInvoice) &&
                <InvoicesList invoices={invoices}/>
            }
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
