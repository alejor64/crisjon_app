import moment from 'moment'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../../layout'
import { InvoiceFilters, OrdersTable } from '../components'
import { MONTH, DATA_PICKER_FORMAT, USA_DATE_FORMAT } from '../../../utils/constants'
import { Button, InputLabelContainer } from '../../../components/form'
import { createInvoice } from '../../../api/invoice'
import Swal from 'sweetalert2'

const thList = ['Checked', 'Client', 'Name', 'Client Job name', 'Item', 'Delivered date', 'Price']
const rowsToShow = ['id', 'clientName', 'name', 'clientJobName', 'item', 'deliveredDate', 'price']

export const InvoicePage = () => {
  const [startDate, setStartDate] = useState(moment().startOf(MONTH).format(DATA_PICKER_FORMAT))
  const [endDate, setEndDate] = useState(moment().endOf(MONTH).format(DATA_PICKER_FORMAT))
  const [client, setClient] = useState("")
  const [orders, setOrders] = useState([])
  const [ordersChecked, setOrdersChecked] = useState([])
  const [invoiceNumber, setInvoiceNumber] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    if(!client) setOrdersChecked([])
  }, [client])
  
  const onClick = () => {
    if(!invoiceNumber){
      setError(true)
    }else{
      setError(false)
      const ordersPayed = orders.filter(order => ordersChecked.includes(order._id))
      const totalPrice = ordersPayed.reduce((totalPrice, order) => totalPrice + order.price, 0)
      const data = {
        totalPrice,
        ordersPayed,
        endDate: moment(endDate).format(USA_DATE_FORMAT),
        startDate: moment(startDate).format(USA_DATE_FORMAT),
        clientName: client,
        number: invoiceNumber,
      }
      createInvoice(data)
        .then(response => {
          console.log('response', response)
          if(response?.invoice){
            Swal.fire({
              title: 'Success!',
              text: response.msn,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }else {
            Swal.fire({
              title: 'Error!',
              text: response[0].msg,
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
    }
  }

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
          />
          {
            (orders.length > 0 && client) &&
              <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <OrdersTable
                    thList={thList}
                    tdList={orders}
                    route="invoice"
                    rowsToShow={rowsToShow}
                    setOrdersChecked={setOrdersChecked}
                    ordersChecked={ordersChecked}
                  />
                </div>
              </div>
          }
          {
            (ordersChecked.length > 0 && client) &&
              <div className='flex flex-col items-center'>
                <div className='w-1/2 flex items-end'>
                  <InputLabelContainer
                    type="number"
                    text="Invoice number"
                    css="w-2/3 mr-3"
                    inputValue={invoiceNumber}
                    setInputValue={setInvoiceNumber}
                  />
                  <Button
                    onClick={onClick}
                    text="Create invoice"
                    css='w-1/3 h-10 ml-3'
                  />
                </div>
                {
                  error &&
                    <div className='w-1/2'>
                      <p className='text-red-500'>Invoice number is required</p>
                    </div>
                }
              </div>
          }
        </div>
      </div>
    </DashboardLayout>
  )
}
