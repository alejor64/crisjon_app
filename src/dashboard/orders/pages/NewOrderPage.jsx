import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { DashboardLayout } from '../../layout'
import { OrderForm } from '../components'
import { createOrder } from '../../../api/orders'
import { addValueToSS, prepareDatePropertyInObject } from '../../../utils/functions'
import { ORDERS } from '../../../utils/constants'

export const NewOrderPage = () => {
  const formRef = useRef()

  const onSubmit = async(e) => {
    e.preventDefault()
    const childState = formRef.current.getFormState()
    const response = await createOrder(childState)
    if(response?.order){
      const { order } = response
      order.createdAt = prepareDatePropertyInObject(order, 'createdAt')
      order.dueDate = prepareDatePropertyInObject(order, 'dueDate')
      order.lastModificatedAt = prepareDatePropertyInObject(order, 'lastModificatedAt')
      addValueToSS(ORDERS, order)
      Swal.fire({
        title: 'Success!',
        text: `Order ${order.name} was created successfully.`,
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
        timer: 2000
      })
    }
  }

  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container mx-auto max-w-7xl px-2 mt-2'>
          <Link
            to="order/list"
            className='underline text-blue-700'
          >
            Go to order list
          </Link>
        </div>
        <OrderForm
          title="Add new order"
          buttonText="Save new order"
          buttonIcon={faFloppyDisk}
          onSubmit={onSubmit}
          ref={formRef}
        />
      </div>
    </DashboardLayout>
  )
}