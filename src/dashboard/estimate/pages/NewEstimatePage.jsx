import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from '../../layout'
import { EstimateForms, MetalPrice } from '../components'
import { useEffect, useState } from 'react'
import { ESTIMATED_PRICES, GOLDEN_PRICE } from '../../../utils/constants'
import { createEstimate, getMetalPrice } from '../../../api/estimatedPrice/estimatedPrice'
import { addValueToSS, prepareDatePropertyInObject } from '../../../utils/functions'
import { CircularProgress } from '@mui/material'

export const NewEstimatePage = () => {
  const goldenInSS = JSON.parse(sessionStorage.getItem(GOLDEN_PRICE)) || {price: 0}
  const [goldenPrice, setGoldenPrice] = useState(goldenInSS.price)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!goldenPrice.price) {
      setLoading(true);
      getMetalPrice()
        .then(response => setGoldenPrice(response.gold.price))
        .finally(() => setLoading(false));
    }
  }, [])
  
  const createOrUpdate = async ({body}) => {
    let response = await createEstimate(body)
    const { estimatedPrice } = response
    if(estimatedPrice?.createdAt){
      estimatedPrice.createdAt = prepareDatePropertyInObject(estimatedPrice, 'createdAt')
      addValueToSS(ESTIMATED_PRICES, estimatedPrice)
    }
    return response
  }
  
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
        {
          loading ?
            <CircularProgress />
          :
            <EstimateForms
              title="Create new estimate"
              buttonText="Save new estimate"
              goldenPriceInDB={goldenPrice}
              createOrUpdate={createOrUpdate}
              buttonIcon={faFloppyDisk}
            />
        }
      </div>
    </DashboardLayout>
  )
}