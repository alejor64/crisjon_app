import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from "../../layout"
import { getEstimatePriceById, getMetalPrice } from "../../../api/estimatedPrice/estimatedPrice"
import { EstimateForms, EstimatePdf, MetalPrice } from "../components"
import { GOLDEN_PRICE } from "../../../utils/constants"

export const EditEstimatedPage = () => {
  const { estimateId } = useParams()
  const navigate = useNavigate()
  const [showPDF, setShowPDF] = useState(false)
  const [estimatePrice, setEstimatePrice] = useState({})
  const goldInSS = JSON.parse(sessionStorage.getItem(GOLDEN_PRICE)) || {price: 0}
  const [goldTodayPrice, setgoldTodayPrice] = useState(goldInSS.price)

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
              ? <EstimatePdf estimateId={estimateId} />
              : <EstimateForms
                  title="Edit estimate"
                  estimate={estimatePrice}
                  buttonText="Edit estimate"
                  updateOrder={true}
                  goldenPriceInDB={estimatePrice.goldenPrice}
                  buttonIcon={faFloppyDisk}
                />
            }
          </div>
      }
    </DashboardLayout>
  )
}
