import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import Swal from 'sweetalert2'
import { getOrdersById, updateOrder } from "../../../api/orders"
import { prepareDatePropertyInObject, updateValueInSS } from "../../../utils/functions"
import { ORDERS } from "../../../utils/constants"
import { DashboardLayout } from "../../layout"
import { OrderForm } from "../components/OrderForm"
import { OrderPDF } from "../components"

export const EditOrderPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [showPDF, setShowPDF] = useState(false)
  const [orderInfo, setOrderInfo] = useState({})
  const [order, setOrder] = useState({})
  const formRef = useRef()

  useEffect(() => {
    getOrdersById(orderId)
      .then(response => setOrder(response))
  }, [])
  

  const goBackClic = () => {
    if(showPDF){
      setShowPDF(false)
    }else {
      navigate(-1)
    }
  }

  const generatePDF = async () => {
    const childState = formRef.current.getFormState()
    setOrderInfo(childState)
    await updateOrderInfo()
    setShowPDF(true)
  }

  const updateOrderInfo = async () => {
    const childState = formRef.current.getFormState()
    const response = await updateOrder(orderId, childState)
    if(response?.order){
      const { msn, order } = response
      order.createdAt = prepareDatePropertyInObject(order, 'createdAt')
      order.deliveredDate = prepareDatePropertyInObject(order, 'deliveredDate')
      order.lastModificatedAt = prepareDatePropertyInObject(order, 'lastModificatedAt')
      order.dueDate = prepareDatePropertyInObject(order, 'dueDate')
      order.paymentDate = prepareDatePropertyInObject(order, 'paymentDate')
      updateValueInSS(ORDERS, order)
      Swal.fire({
        title: 'Success!',
        text: msn,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      Swal.fire({
        title: 'Error!',
        text: response.msn,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await updateOrderInfo()
  }

  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container flex justify-between mx-auto max-w-7xl px-2 mt-2'>
          <p
            onClick={goBackClic}
            className='underline text-blue-700 cursor-pointer'
          >
            Go back
          </p>
          <p
            onClick={generatePDF}
            className='underline text-blue-700 cursor-pointer'
            id="pdf"
          >
            Generate PDF
          </p>
        </div>
        {
          order._id &&
            <>
              {
                showPDF
                ? <OrderPDF orderInfo={orderInfo} />
                : <OrderForm
                    title="Edit order"
                    buttonText="Edit oder"
                    buttonIcon={faPenToSquare}
                    edit={true}
                    order={order}
                    ref={formRef}
                    onSubmit={onSubmit}
                  />
              }
            </>
        }
      </div>
    </DashboardLayout>
  )
}
