import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"
import { ESTIMATED_PRICES } from '../../../utils/constants'
import { getEstimatedPrices } from '../../../api/estimatedPrice/estimatedPrice'
import { formatCurrency } from '../../../utils/functions'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'

const thList = ['Created at', 'Name', 'Client Name', 'Price', 'Golden Price']
const rowsToShow = ['id', 'createdAt', 'name', 'clientName', 'totalPrice', 'goldenPrice']

const prepareEstimatedPrices = (estimatePrices) => {
  return estimatePrices.map(ep => ({
      ...ep,
      goldenPrice: formatCurrency(parseFloat(1 / ep.goldenPrice).toFixed(2)),
      totalPrice: formatCurrency(ep.totalPrice),
    }
  ))
}

export const EstimatePage = () => {
  const estimatedPricesInSS = JSON.parse(sessionStorage.getItem(ESTIMATED_PRICES) || '[]')
  const [estimatePrices, setestimatePrices] = useState(prepareEstimatedPrices(estimatedPricesInSS))

  useEffect(() => {
    if(!estimatePrices.length) {
      getEstimatedPrices()
        .then( response => setestimatePrices(prepareEstimatedPrices(response.estimatedPrices)))
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h2 className="text-3xl text-center my-2">
          ESTIMATES
        </h2>
        <div className="mt-2">
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                estimatePrices.length
                ? <Table thList={thList} tdList={estimatePrices} rowsToShow={rowsToShow} route="estimate" />
                : <NotItemsFound text="estimates" />
              }
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex justify-around sm:px-6">
          <Link
            className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
            to="/estimate/new"
          >
            Make an estimate
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
