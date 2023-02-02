import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"
import { OrderFilters, SumOfPrice, Toggle } from "../components"

import { tdList } from "./orders"

const thList = ['Client', 'CAD number', 'Name', 'Created Date', 'Job name', 'Service', 'Satus', 'Price']
const rowsToShow = ['id', 'client', 'cad_number', 'name', 'created_at', 'client_job_name', 'service', 'status', 'price']

export const OrderPage = () => {
  const today = new Date()
  const previous = new Date()
  const lastMonth = new Date(previous.setDate(1))

  const [orderList, setOrderList] = useState(tdList || [])
  const [endDateValue, setEndDateValue] = useState(today.toISOString().split("T")[0])
  const [startDate, setStartDate] = useState(lastMonth.toISOString().split("T")[0])
  const [checkedValue, setCheckedValue] = useState(false)
  const [doneCheckbox, setDoneCheckbox] = useState(false)
  const [returnedCheckbox, setReturnedCheckbox] = useState(false)
  const [showTotalPriceSum, setShowTotalPriceSum] = useState(false)
  const [clientValue, setClientValue] = useState("")
  const [error, setError] = useState(false)

  const onClick = () => {
    let ordersFiltered = tdList
    if(startDate && endDateValue && startDate > endDateValue) {
      setError(true)
    }else{
      setError(false)
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
        ordersFiltered = ordersFiltered.filter(order => order.created_at >= startDate)
      }
      if(endDateValue){
        ordersFiltered = ordersFiltered.filter(order => order.created_at <= endDateValue)
      }
      if(clientValue){
        ordersFiltered = ordersFiltered.filter(order => order.client === clientValue)
      }
    }
    setOrderList(ordersFiltered)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-3xl text-center my-2">
            ORDERS
          </h2>
          <div className="flex justify-center items-center py-2 min-w-full max-w-full sm:px-6 lg:px-8">
            <span className='mr-2'>
              { checkedValue ? 'Hide filters' : 'Show filters' }
            </span>
            <Toggle checkedValue={checkedValue} setCheckedValue={setCheckedValue} />
          </div>
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
                error={error}
              />
          }
          {
            showTotalPriceSum &&
              <SumOfPrice orderList={orderList} />
          }
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                orderList.length
                ? <Table thList={thList} tdList={orderList} route="order" rowsToShow={rowsToShow} />
                : <h2>No hay ordenes</h2>
              }
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-around space-x-2">
          <Link
            className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
            to="/order/new"
          >
            Add new order
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
