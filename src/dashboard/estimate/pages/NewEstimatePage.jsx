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
  const [clientName, setClientName] = useState("")
  const [cadPrice, setCadPrice] = useState(0)
  const [waxPrice, setWaxPrice] = useState(0)
  const [waxQuantity, setWaxQuantity] = useState(0)
  const [castingPrice, setCastingPrice] = useState(0)
  const [castingQuantity, setCastingQuantity] = useState(0)
  const [metalType, setMetalType] = useState("")
  const [metalPrice, setMetalPrice] = useState(0)
  const [metalQuantity, setMetalQuantity] = useState(0)
  const [stoneQuantity, setStoneQuantity] = useState(0)
  const [stonePrice, setStonePrice] = useState(0)
  const [centerStonePrice, setCenterStonePrice] = useState(0)
  const [diamondWeight, setDiamondWeight] = useState(0)
  const [diamondPrice, setDiamondPrice] = useState(0)
  const [colorStone, setColorStone] = useState(0)
  const [cleaningPrice, setCleaningPrice] = useState(0)
  const [cleaningQuantity, setCleaningQuantity] = useState(0)
  const [polishingPrice, setPolishingPrice] = useState(0)
  const [polishingQuantity, setPolishingQuantity] = useState(0)
  const [assemblingPrice, setAssemblingPrice] = useState(0)
  const [assemblingQuantity, setAssemblingQuantity] = useState(0)
  const [findingsPrice, setFindingsPrice] = useState(0)
  const [findingsQuantity, setFindingsQuantity] = useState(0)
  const [rhodioumPrice, setRhodioumPrice] = useState(0)
  const [rhodioumQuantity, setRhodioumQuantity] = useState(0)
  const [engravingPrice, setEngravingPrice] = useState(0)
  const [engravingQuantity, setEngravingQuantity] = useState(0)
  const [picturePrice, setPicturePrice] = useState(0)
  const [pictureQuantity, setPictureQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

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
          clientName={clientName}
          cadPrice={cadPrice}
          waxPrice={waxPrice}
          waxQuantity={waxQuantity}
          castingPrice={castingPrice}
          castingQuantity={castingQuantity}
          metalType={metalType}
          metalPrice={metalPrice}
          metalQuantity={metalQuantity}
          stoneQuantity={stoneQuantity}
          stonePrice={stonePrice}
          centerStonePrice={centerStonePrice}
          diamondWeight={diamondWeight}
          diamondPrice={diamondPrice}
          colorStone={colorStone}
          cleaningPrice={cleaningPrice}
          cleaningQuantity={cleaningQuantity}
          polishingPrice={polishingPrice}
          polishingQuantity={polishingQuantity}
          assemblingPrice={assemblingPrice}
          assemblingQuantity={assemblingQuantity}
          findingsPrice={findingsPrice}
          findingsQuantity={findingsQuantity}
          rhodioumPrice={rhodioumPrice}
          rhodioumQuantity={rhodioumQuantity}
          engravingPrice={engravingPrice}
          engravingQuantity={engravingQuantity}
          picturePrice={picturePrice}
          pictureQuantity={pictureQuantity}
          totalPrice={totalPrice}
          setClientName={setClientName}
          setCadPrice={setCadPrice}
          setWaxPrice={setWaxPrice}
          setWaxQuantity={setWaxQuantity}
          setCastingPrice={setCastingPrice}
          setCastingQuantity={setCastingQuantity}
          setMetalType={setMetalType}
          setMetalPrice={setMetalPrice}
          setMetalQuantity={setMetalQuantity}
          setStoneQuantity={setStoneQuantity}
          setStonePrice={setStonePrice}
          setCenterStonePrice={setCenterStonePrice}
          setDiamondWeight={setDiamondWeight}
          setDiamondPrice={setDiamondPrice}
          setColorStone={setColorStone}
          setCleaningPrice={setCleaningPrice}
          setCleaningQuantity={setCleaningQuantity}
          setPolishingPrice={setPolishingPrice}
          setPolishingQuantity={setPolishingQuantity}
          setAssemblingPrice={setAssemblingPrice}
          setAssemblingQuantity={setAssemblingQuantity}
          setFindingsPrice={setFindingsPrice}
          setFindingsQuantity={setFindingsQuantity}
          setRhodioumPrice={setRhodioumPrice}
          setRhodioumQuantity={setRhodioumQuantity}
          setEngravingPrice={setEngravingPrice}
          setEngravingQuantity={setEngravingQuantity}
          setPicturePrice={setPicturePrice}
          setPictureQuantity={setPictureQuantity}
          setTotalPrice={setTotalPrice}
        />
      </div>
    </DashboardLayout>
  )
}