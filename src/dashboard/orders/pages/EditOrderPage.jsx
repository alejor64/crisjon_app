import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DashboardLayout } from "../../layout"
import { OrderForm } from "../components/OrderForm"
import { OrderPDF } from "../components"

import { tdList } from "./orders"

export const EditOrderPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [showPDF, setShowPDF] = useState(false)
  const [orderInfo, setOrderInfo] = useState({})
  const childRef = useRef()

  const goBackClic = () => {
    navigate(-1)
  }

  const generatePDF = () => {
    const childState = childRef.current.getFormState()
    setOrderInfo(childState)
    setShowPDF(!showPDF)
  }

  const order = tdList.find(order => order.id === orderId)

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
          >
            Generate PDF
          </p>
        </div>
        {
          showPDF
          ? <OrderPDF orderInfo={orderInfo} />
          : <OrderForm
              title="Edit order"
              buttonText="Edit oder"
              buttonIcon={faPenToSquare}
              edit={true}
              order={order}
              ref={childRef}
            />
        }
        
      </div>
    </DashboardLayout>
  )
}
