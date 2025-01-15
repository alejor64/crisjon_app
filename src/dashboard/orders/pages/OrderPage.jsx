import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getOrders } from '../../../api/orders'
import { DATA_PICKER_FORMAT, ORDERS, USA_DATE_FORMAT } from '../../../utils/constants'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'
import { DashboardLayout } from "../../layout"
import { OrderFilters, SumOfPrice } from "../components"
import { DateError } from '../../../components/filter/errors'
import { ToggleContainer } from '../../../components/toggle'
import { formatCurrency } from '../../../utils/functions'
import { DataGridCustom } from '../../components/Table/DataGridCustom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'

const prepareOrders = (orders) => {
  return orders.map(order => ({
    ...order,
    price: formatCurrency(order.price),
    id: order._id
  }))
};

export const OrderPage = () => {
  const today = moment()
  const lastMonth = moment().startOf('month')
  const ordersInLS = prepareOrders(JSON.parse(sessionStorage.getItem(ORDERS) || '[]'))
  const [orders, setOrders] = useState(ordersInLS)
  const [endDateValue, setEndDateValue] = useState(today.format(DATA_PICKER_FORMAT))
  const [startDate, setStartDate] = useState(lastMonth.format(DATA_PICKER_FORMAT))
  const [checkedValue, setCheckedValue] = useState(false)
  const [doneCheckbox, setDoneCheckbox] = useState(false)
  const [paidOrders, setPaidOrders] = useState(false)
  const [showTotalPriceSum, setShowTotalPriceSum] = useState(false)
  const [clientValue, setClientValue] = useState("")
  const [errorMsn, setErrorMsn] = useState(<></>)

  useEffect(() => {
    if(!orders.length) {
      getOrders()
        .then( response => setOrders(prepareOrders(response.orders)))
    }
  }, [])

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Warning!',
      text: `Are you sure you want to delete the order ${row.clientJobName || row.jobId}?`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonColor: "#1F2937",
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: 'No, cancel!',
    }).then(({isConfirmed}) => {
      if(isConfirmed) useDeleteData("order", row._id)
    })
  }
  
  const columns = [
    {
      field: 'clientName',
      headerName: 'Client',
      flex: 1
    },
    {
      field: 'cadNumber',
      headerName: 'CAD Number',
      flex: 1
    },
    {
      field: 'clientJobName',
      headerName: 'Client Job Name',
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      flex: 1
    },
    {
      field: 'deliveredDate',
      headerName: 'Delivered Date',
      flex: 1
    },
    {
      field: 'service',
      headerName: 'Service',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="min-h-[25px] text-red-500 cursor-pointer"
          onClick={() => handleDelete(params.row)}
        />
      ),
    }
  ];

  const onClick = () => {
    let ordersFiltered = ordersInLS
    if(startDate && endDateValue && startDate > endDateValue) {
      setErrorMsn(<DateError/>)
    }else{
      setErrorMsn(<></>)
      if(doneCheckbox){
        ordersFiltered = ordersFiltered.filter(order => order.done)
      }
      if(paidOrders){
        setShowTotalPriceSum(true)
        ordersFiltered = ordersFiltered.filter(order => order.payed )
      }else{
        setShowTotalPriceSum(false)
      }
      if(startDate){
        const startDateFormatted = moment(startDate).format(USA_DATE_FORMAT)
        ordersFiltered = ordersFiltered.filter(order => order.createdAt >= startDateFormatted )
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
                paidOrders={paidOrders}
                setPaidOrders={setPaidOrders}
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
                ? 
                  <DataGridCustom
                    columns={columns}
                    rows={orders}
                    filterKeys={columns.map(column => column.field)}
                    sortProperty="clientName"
                    route="order"
                  />
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
