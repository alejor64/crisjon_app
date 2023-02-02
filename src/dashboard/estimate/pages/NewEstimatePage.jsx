import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { metalsPricesApi } from "../api/metalPriceApi"
import { DashboardLayout } from '../../layout'
import { EstimateForms, MetalPrice } from '../components'

export const NewEstimatePage = () => {
  
  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container flex justify-between mx-auto max-w-7xl px-4 sm:px-6 mt-2'>
          <Link
            to="estimate/list"
            className='underline text-blue-700'
          >
            Go to estimate list
          </Link>
          {
            loading
            ? <p>Loading</p>
            : <MetalPrice metal="Gold" rate="0.00052106" />
          }
        </div>
        <EstimateForms
          title="Add new order"
          buttonText="Save new order"
          buttonIcon={faFloppyDisk}
        />
      </div>
    </DashboardLayout>
  )
}