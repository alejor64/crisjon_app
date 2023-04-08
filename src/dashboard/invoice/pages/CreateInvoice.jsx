import { useState } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import { createInvoice } from '../../../api/invoice'
import { OrdersTable } from '../components'
import { InvoiceContainer } from '../components/invoiceContainer'
import { CLIENTS, DATA_PICKER_FORMAT } from '../../../utils/constants'
import { formatCurrency } from '../../../utils/functions'

const thList = ['Checked', 'Client', 'Name', 'Client Job name', 'Item', 'Delivered date', 'Price']
const rowsToShow = ['id', 'clientName', 'name', 'clientJobName', 'item', 'deliveredDate', 'price']

export const CreateInvoice = ({orders, setOrdersChecked, ordersChecked, invoiceNumber, setInvoiceNumber, client, startDate, endDate}) => {
  const [error, setError] = useState(false)
  const clients = JSON.parse(sessionStorage.getItem(CLIENTS) || '[]')
  const clientOutstandingBalance = clients.find(clientInfo => clientInfo.name === client)?.outstandingBalance

  const prepareOrdersTable = (orders) => {
    return orders.map(order => ({
      ...order,
      price: formatCurrency(order?.price)
    }))
  }

  const onClick = () => {
    if(!invoiceNumber){
      setError(true)
    }else{
      setError(false)
      const ordersPayed = orders.filter(order => ordersChecked.includes(order._id))
      const totalPrice = ordersPayed.reduce((totalPrice, order) => totalPrice + order.price, 0)
      const data = {
        totalPrice: totalPrice + clientOutstandingBalance,
        ordersPayed,
        startDate: moment(startDate).format(DATA_PICKER_FORMAT),
        endDate: moment(endDate).format(DATA_PICKER_FORMAT),
        clientName: client,
        number: invoiceNumber,
      }
      createInvoice(data)
        .then(response => {
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
    <>
      {
        (orders.length > 0) &&
          <OrdersTable
            thList={thList}
            tdList={prepareOrdersTable(orders)}
            route="invoice"
            rowsToShow={rowsToShow}
            setOrdersChecked={setOrdersChecked}
            ordersChecked={ordersChecked}
          />
      }
      {
        (ordersChecked.length > 0) &&
          <InvoiceContainer
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
            onClick={onClick}
            error={error}
          />
      }
    </>
  )
}
