import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from '../../layout'
import { EstimateForms, MetalPrice } from '../components'
import { useEffect, useState } from 'react'
import { GOLDEN_PRICE } from '../../../utils/constants'
import { getMetalPrice } from '../../../api/estimatedPrice/estimatedPrice'

export const NewEstimatePage = () => {
  const goldenInSS = JSON.parse(sessionStorage.getItem(GOLDEN_PRICE)) || {price: 0}
  const [goldenPrice, setGoldenPrice] = useState(goldenInSS.price)

  useEffect(() => {
    if(!goldenPrice.price) {
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
          title="Create new estimate"
          buttonText="Save new estimate"
          goldenPriceInDB={goldenPrice}
          buttonIcon={faFloppyDisk}
        />
      </div>
    </DashboardLayout>
  )
}