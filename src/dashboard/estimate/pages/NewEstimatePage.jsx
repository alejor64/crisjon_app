import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from '../../layout'
import { EstimateForms, MetalPrice } from '../components'
import { useEffect, useState } from 'react'
import { GOLDEN_PRICE } from '../../../utils/constants'
import { getMetalPrice } from '../../../api/estimatedPrice/estimatedPrice'

export const NewEstimatePage = () => {
  const goldenPriceInSS = sessionStorage.getItem(GOLDEN_PRICE) || 0
  const [goldenPrice, setGoldenPrice] = useState(goldenPriceInSS)

  useEffect(() => {
    if(!goldenPrice) {
      getMetalPrice()
        .then(response => setGoldenPrice(response.gold.price))
    }
  }, [])
  
  
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
          <MetalPrice metal="Gold" rate={goldenPrice} />
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