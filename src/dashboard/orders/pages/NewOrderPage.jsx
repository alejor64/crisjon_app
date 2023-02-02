import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from '../../layout'
import { OrderForm } from '../components'

export const NewOrderPage = () => {
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
        />
      </div>
    </DashboardLayout>
  )
}