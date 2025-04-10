import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from "../../layout"
import { createEstimate, getEstimatePriceById, getMetalPrice, updateEstimate } from "../../../api/estimatedPrice/estimatedPrice"
import { EstimateForms, EstimatePdf, MetalPrice } from "../components"
import { ESTIMATED_PRICES, GOLDEN_PRICE } from "../../../utils/constants"
import { addValueToSS, prepareDatePropertyInObject, updateValueInSS } from "../../../utils/functions"

export const EditEstimatedPage = () => {
  const { estimateId } = useParams()
  const navigate = useNavigate()
  const [showPDF, setShowPDF] = useState(false)
  const [estimatePrice, setEstimatePrice] = useState({})
  const goldInSS = JSON.parse(sessionStorage.getItem(GOLDEN_PRICE)) || {price: 0};
  const [goldTodayPrice, setgoldTodayPrice] = useState(goldInSS.price);

  useEffect(() => {
    getEstimatePriceById(estimateId)
      .then(setEstimatePrice)
  }, [estimateId])

  useEffect(() => {
    if(!goldInSS.price) {
      getMetalPrice()
        .then(response => setgoldTodayPrice(response.gold.price))
    }
  }, [])
  
  const updateGoldPrice = () => {
    const estimatePriceUpdated = {
      ...estimatePrice,
      goldenPrice: goldTodayPrice
    }
    setEstimatePrice({...estimatePriceUpdated})
  }

  const generatePDF = async () => {
    setShowPDF(true)
  }

  const goBackClic = () => {
    if(showPDF){
      setShowPDF(false)
    }else {
      navigate(-1)
    }
  }

  const createOrUpdate = async ({body, updateOrder, estimateId}) => {
    let response;
    if(updateOrder){
      response = await updateEstimate(estimateId, body)
      const { estimatedPrice } = response
      estimatedPrice.createdAt = prepareDatePropertyInObject(estimatedPrice, 'createdAt')
      setEstimatePrice({...estimatedPrice})
      updateValueInSS(ESTIMATED_PRICES, estimatedPrice)
    }else {
      response = await createEstimate(body)
      const { estimatedPrice } = response
      estimatedPrice.createdAt = prepareDatePropertyInObject(estimatedPrice, 'createdAt')
      setEstimatePrice({...estimatedPrice})
      addValueToSS(ESTIMATED_PRICES, estimatedPrice)
    }
    return response
  }
  
  return (
    <DashboardLayout>
      {
        estimatePrice?._id &&
          <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='container flex justify-between mx-auto max-w-7xl px-4 sm:px-6 mt-2'>
              <p
                onClick={goBackClic}
                className='underline text-blue-700 cursor-pointer'
              >
                Go back
              </p>
              {
                !showPDF &&
                  <>
                    <MetalPrice
                      metal="Gold"
                      rate={estimatePrice.goldenPrice}
                      todayRatePrice={goldTodayPrice}
                      onClick={updateGoldPrice}
                    />
                    <p
                      onClick={generatePDF}
                      className='underline text-blue-700 cursor-pointer'
                      id="pdf"
                    >
                      Generate PDF
                    </p>
                  </>
              }
            </div>
            {
              showPDF
              ? <EstimatePdf estimateId={estimateId} estimate={estimatePrice} />
              : <EstimateForms
                  title="Edit estimate"
                  estimate={estimatePrice}
                  buttonText="Edit estimate"
                  updateOrder={true}
                  goldenPriceInDB={estimatePrice.goldenPrice}
                  buttonIcon={faFloppyDisk}
                  createOrUpdate={createOrUpdate}
                />
            }
          </div>
      }
    </DashboardLayout>
  )
}
