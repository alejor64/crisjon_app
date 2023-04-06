import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getOrders } from '../../../api/orders'
import { ORDERS, USA_DATE_FORMAT } from '../../../utils/constants'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"
import { OrderFilters, SumOfPrice, Toggle } from "../components"
import { DateError } from '../../../components/filter/errors'
import { ToggleContainer } from '../../../components/toggle'

const thList = ['Client', 'CAD Number', 'Name', 'Client Job name', 'Created Date', 'Service', 'Satus', 'Price']
const rowsToShow = ['id', 'clientName', 'cadNumber', 'name', 'clientJobName', 'createdAt', 'service', 'status', 'price']

export const OrderPage = () => {
  const today = new Date()
  const previous = new Date()
  const lastMonth = new Date(previous.setDate(1))

  const ordersInLS = JSON.parse(sessionStorage.getItem(ORDERS) || '[]')
  const [orders, setOrders] = useState(ordersInLS)
  const [endDateValue, setEndDateValue] = useState(today.toISOString().split("T")[0])
  const [startDate, setStartDate] = useState(lastMonth.toISOString().split("T")[0])
  const [checkedValue, setCheckedValue] = useState(false)
  const [doneCheckbox, setDoneCheckbox] = useState(false)
  const [returnedCheckbox, setReturnedCheckbox] = useState(false)
  const [showTotalPriceSum, setShowTotalPriceSum] = useState(false)
  const [clientValue, setClientValue] = useState("")
  const [errorMsn, setErrorMsn] = useState(<></>)

  useEffect(() => {
    if(!orders.length) {
      getOrders()
        .then( response => setOrders(response.orders))
    }
  }, [])
  

  const onClick = () => {
    let ordersFiltered = ordersInLS
    if(startDate && endDateValue && startDate > endDateValue) {
      setErrorMsn(<DateError/>)
    }else{
      setErrorMsn(<></>)
      if(doneCheckbox){
        ordersFiltered = ordersFiltered.filter(order => order.done)
      }
      if(returnedCheckbox){
        setShowTotalPriceSum(true)
        ordersFiltered = ordersFiltered.filter(order => order.delivered)
      }else{
        setShowTotalPriceSum(false)
      }
      if(startDate){
        const startDateFormatted = moment(startDate).format(USA_DATE_FORMAT)
        ordersFiltered = ordersFiltered.filter(order => order.createdAt >= startDateFormatted)
      }
      if(endDateValue){
        const endDateFormatted = moment(endDateValue).format(USA_DATE_FORMAT)
        ordersFiltered = ordersFiltered.filter(order => order.createdAt <= endDateFormatted)
      }
      if(clientValue){
        ordersFiltered = ordersFiltered.filter(order => order.clientName === clientValue)
      }
    }
    setOrders(ordersFiltered)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-3xl text-center my-2">
            ORDERS
          </h2>
          <ToggleContainer
            text={checkedValue ? 'Hide filters' : 'Show filters'}
            checkedValue={checkedValue}
            setCheckedValue={setCheckedValue}
          />
          {
            checkedValue &&
              <OrderFilters
                doneCheckbox={doneCheckbox}
                setDoneCheckbox={setDoneCheckbox}
                returnedCheckbox={returnedCheckbox}
                setReturnedCheckbox={setReturnedCheckbox}
                endDateValue={endDateValue}
                setEndDateValue={setEndDateValue}
                startDate={startDate}
                setStartDate={setStartDate}
                clientValue={clientValue}
                setClientValue={setClientValue}
                onClick={onClick}
                errorMsn={errorMsn}
              />
          }
          {
            showTotalPriceSum &&
              <SumOfPrice orderList={orders} />
          }
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            {
              orders.length > 10 &&
                <div className="p-4 flex justify-around space-x-2">
                  <Link
                    className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
                    to="/order/new"
                  >
                    Add new order
                  </Link>
                </div>
            }
            <div className="overflow-hidden">
              {
                orders.length
                ? <Table thList={thList} tdList={orders} route="order" rowsToShow={rowsToShow} />
                : <NotItemsFound text="orders" />
              }
            </div>
          </div>
        </div>
        {
          orders.length <= 10 &&
            <div className="p-4 flex justify-around space-x-2">
              <Link
                className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
                to="/order/new"
              >
                Add new order
              </Link>
            </div>
        }
      </div>
    </DashboardLayout>
  )
}
