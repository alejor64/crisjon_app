import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Form, Button } from "../../../components/form"
import { ContainerInputs, ContainerMetalInputs, ContainerOneInput } from "./form"
import { SelectClient } from "../../clients/components"

const Total = ({totalPrice}) => {
  return (
    <span className="font-semibold text-xl">
      Total: ${totalPrice}
    </span>
  )
}

export const EstimateForms = ({ title, estimate, goldenPriceInDB, buttonText, updateOrder = false, createOrUpdate }) => {
  const navigate = useNavigate();
  const goldenPrice = estimate?.goldenPrice || goldenPriceInDB
  const [clearAll, setclearAll] = useState(false)
  const [name, setName] = useState(estimate?.name || "")
  const [clientName, setClientName] = useState(estimate?.clientName || "")
  const [cadPrice, setCadPrice] = useState(estimate?.cadPrice || 0)
  const [waxPrice, setWaxPrice] = useState(estimate?.waxPrice || 0)
  const [waxQuantity, setWaxQuantity] = useState(estimate?.waxQuantity || 1)
  const [castingPrice, setCastingPrice] = useState(estimate?.castingPrice || 0)
  const [castingQuantity, setCastingQuantity] = useState(estimate?.castingQuantity || 1)
  const [metalType, setMetalType] = useState(estimate?.metalType || "")
  const [metalPrice, setMetalPrice] = useState(estimate?.metalPrice || 0)
  const [metalQuantity, setMetalQuantity] = useState(estimate?.metalQuantity || 0)
  const [stonePrice, setStonePrice] = useState(estimate?.stonePrice || 0)
  const [stoneQuantity, setStoneQuantity] = useState(estimate?.stoneQuantity || 1)
  const [centerStonePrice, setCenterStonePrice] = useState(estimate?.centerStonePrice || 0)
  const [cleaningPrice, setCleaningPrice] = useState(estimate?.cleaningPrice || 0)
  const [cleaningQuantity, setCleaningQuantity] = useState(estimate?.cleaningQuantity || 1)
  const [diamondPrice, setDiamondPrice] = useState(estimate?.diamondPrice || 0)
  const [diamondQuantity, setDiamondQuantity] = useState(estimate?.diamondQuantity || 0)
  const [colorStone, setColorStone] = useState(estimate?.colorStone || 0)
  const [polishingPrice, setPolishingPrice] = useState(estimate?.polishingPrice || 0)
  const [polishingQuantity, setPolishingQuantity] = useState(estimate?.polishingQuantity || 1)
  const [assemblingPrice, setAssemblingPrice] = useState(estimate?.assemblingPrice || 0)
  const [assemblingQuantity, setAssemblingQuantity] = useState(estimate?.assemblingQuantity || 1)
  const [findingsPrice, setFindingsPrice] = useState(estimate?.findingsPrice || 0)
  const [findingsQuantity, setFindingsQuantity] = useState(estimate?.findingsQuantity || 1)
  const [rhodioumPrice, setRhodioumPrice] = useState(estimate?.rhodioumPrice || 0)
  const [rhodioumQuantity, setRhodioumQuantity] = useState(estimate?.rhodioumQuantity || 1)
  const [engravingPrice, setEngravingPrice] = useState(estimate?.engravingPrice || 0)
  const [engravingQuantity, setEngravingQuantity] = useState(estimate?.engravingQuantity || 1)
  const [picturePrice, setPicturePrice] = useState(estimate?.picturePrice || 0)
  const [pictureQuantity, setPictureQuantity] = useState(estimate?.pictureQuantity || 1)
  const [totalPrice, setTotalPrice] = useState(estimate?.totalPrice || 0)

  const getAllStates = () => {
    return {
     name, clientName, cadPrice, goldenPrice, waxPrice, waxQuantity, castingPrice, castingQuantity, metalType, metalPrice, metalQuantity, stonePrice, stoneQuantity, centerStonePrice, cleaningPrice, cleaningQuantity, diamondPrice, diamondQuantity, colorStone, polishingPrice, polishingQuantity, assemblingPrice, assemblingQuantity, findingsPrice, findingsQuantity, rhodioumPrice, rhodioumQuantity, engravingPrice, engravingQuantity, picturePrice, pictureQuantity, totalPrice,
    }
  }

  const calculateTotal = () => {
    const total = cadPrice + (waxPrice * waxQuantity) + (castingPrice * castingQuantity) + (metalPrice * metalQuantity) + (stonePrice * stoneQuantity) + (centerStonePrice) + (diamondPrice * diamondQuantity) + (cleaningPrice * cleaningQuantity) + (colorStone) + (polishingPrice * polishingQuantity) + (assemblingPrice * assemblingQuantity) + (findingsPrice * findingsQuantity) + (rhodioumPrice * rhodioumQuantity) + (engravingPrice * engravingQuantity) + (picturePrice * pictureQuantity)
    setTotalPrice(total.toFixed(2))
    return total
  }

  const handleClearAll = () => {
    setclearAll(true)
    setMetalType("")
    calculateMetalPrice(0);
    setMetalQuantity(0);
    setTotalPrice(0)
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const apiCall = async () => {
    const total = calculateTotal()
    const body = getAllStates()
    body.totalPrice = total
    const estimateId = estimate?._id
    const response = await createOrUpdate({body, updateOrder, estimateId})
    return response
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    const response = await apiCall()
    if(response?.ok){
      Swal.fire({
        title: 'Success!',
        text: response.msn,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      }).then(resp => {
        navigate(`/estimate/edit/${response.estimatedPrice._id}`)
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: response.msg,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  const calculateMetalPrice = (metal = metalType) => {
    let metalConstant = 0;
    const goldPrice = parseFloat((1 / goldenPrice).toFixed(2));
    switch (metal) {
      case '10k':
        metalConstant = 0.4166;
        break;
      case '14k':
        metalConstant = 0.585;
        break;
      case '18k':
        metalConstant = 0.75;
        break;
      default:
        metalConstant = 0;
        break;
    }
    const finalMetalPrice = (((goldPrice + 60) * 1.25)/20) * metalConstant;
    setMetalPrice(finalMetalPrice.toFixed(2));
    return finalMetalPrice;
  }

  const onChange = (e) => {
    const { value } = e.target;
    setMetalType(value);
    calculateMetalPrice(value);
  }

  return (
    <Form title={title} onSubmit={onSubmit}>
      <div className="flex mb-7 items-center">
        <div className="flex items-center w-1/2 pr-5">
          <span className="w-[120px]">Name</span>
          <input
            type="string"
            name="name"
            className="ml-0 w-full pl-3 py-1.5 md:py-2 sm:text-sm focus:outline-none rounded-md shadow border border-slate-200"
            placeholder="Crisjon - Ring - abc123"
            min="0"
            value={name}
            onChange={onChangeName}
            required={true}
          />
        </div>
        <div className="flex items-center w-1/2 pl-5">
          <span className="w-[120px]">Client</span>
          <SelectClient name="client" required={true} client={clientName} setClient={setClientName} />
        </div>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px] font-semibold">ITEMS</span>
        <div className="flex w-full">
          <span className="w-full mt-1 ml-2 text-center font-semibold">PRICE</span>
          <span className="w-full mt-1 text-center font-semibold">QUANTITY</span>
          <span className="w-full mt-1 text-center font-semibold">TOTAL</span>
        </div>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">CAD</span>
        <ContainerOneInput name="cad" clearAll={clearAll} setclearAll={setclearAll} value={cadPrice} setValue={setCadPrice} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">WAX</span>
        <ContainerInputs name="wax" clearAll={clearAll} setclearAll={setclearAll} valuePrice={waxPrice} setValuePrice={setWaxPrice} valueQuantity={waxQuantity} setValueQuantity={setWaxQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">CASTING</span>
        <ContainerInputs name="casting" clearAll={clearAll} setclearAll={setclearAll} valuePrice={castingPrice} setValuePrice={setCastingPrice} valueQuantity={castingQuantity} setValueQuantity={setCastingQuantity} />
      </div>
      <div className="flex mb-7 justify-center">
        <span>METAL (Weight - dwt)</span>
      </div>
      <div className="flex mb-7 items-center">
        <ContainerMetalInputs onChange={onChange} metalType={metalType} clearAll={clearAll} setclearAll={setclearAll} metalPrice={metalPrice} metalQuantity={metalQuantity} setMetalQuantity={setMetalQuantity} />
      </div>
      <div className="flex mb-7 justify-center">
        <span>LABOR</span>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Setting Stones</span>
        <ContainerInputs name="stones" clearAll={clearAll} setclearAll={setclearAll} valuePrice={stonePrice} setValuePrice={setStonePrice} valueQuantity={stoneQuantity} setValueQuantity={setStoneQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Setting Center Stone</span>
        <ContainerOneInput name="settingCenterStone" clearAll={clearAll} setclearAll={setclearAll} value={centerStonePrice} setValue={setCenterStonePrice} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Cleaning</span>
        <ContainerInputs name="cleaning" clearAll={clearAll} setclearAll={setclearAll} valuePrice={cleaningPrice} setValuePrice={setCleaningPrice} valueQuantity={cleaningQuantity} setValueQuantity={setCleaningQuantity} />
      </div>
      <div className="flex mb-7 justify-center">
        <span>DIAMONDS (Weight - Carats)</span>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Diamonds</span>
        <ContainerInputs name="dimonds" clearAll={clearAll} setclearAll={setclearAll} valuePrice={diamondPrice} setValuePrice={setDiamondPrice} valueQuantity={diamondQuantity} setValueQuantity={setDiamondQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Color Stones</span>
        <ContainerOneInput name="colorStones" clearAll={clearAll} setclearAll={setclearAll} value={colorStone} setValue={setColorStone} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Polishing</span>
        <ContainerInputs name="pollishing" clearAll={clearAll} setclearAll={setclearAll} valuePrice={polishingPrice} setValuePrice={setPolishingPrice} valueQuantity={polishingQuantity} setValueQuantity={setPolishingQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Assembling</span>
        <ContainerInputs name="assembling" clearAll={clearAll} setclearAll={setclearAll} valuePrice={assemblingPrice} setValuePrice={setAssemblingPrice} valueQuantity={assemblingQuantity} setValueQuantity={setAssemblingQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Findings</span>
        <ContainerInputs name="findings" clearAll={clearAll} setclearAll={setclearAll} valuePrice={findingsPrice} setValuePrice={setFindingsPrice} valueQuantity={findingsQuantity} setValueQuantity={setFindingsQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Rhodium</span>
        <ContainerInputs name="rhodioum" clearAll={clearAll} setclearAll={setclearAll} valuePrice={rhodioumPrice} setValuePrice={setRhodioumPrice} valueQuantity={rhodioumQuantity} setValueQuantity={setRhodioumQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Engraving</span>
        <ContainerInputs name="engraving" clearAll={clearAll} setclearAll={setclearAll} valuePrice={engravingPrice} setValuePrice={setEngravingPrice} valueQuantity={engravingQuantity} setValueQuantity={setEngravingQuantity} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Picture</span>
        <ContainerInputs name="picture" clearAll={clearAll} setclearAll={setclearAll} valuePrice={picturePrice} setValuePrice={setPicturePrice} valueQuantity={pictureQuantity} setValueQuantity={setPictureQuantity} />
      </div>
      <div className="flex mb-7 justify-center">
        <Total totalPrice={parseInt(totalPrice).toFixed(2)} />
      </div>
      <div className="flex mb-7 justify-around">
        <span
          className="flex justify-center items-center rounded-md py-2 px-4 text-sm font-medium text-white shadow-sm bg-blue-700 focus:ring-blue-500 hover:bg-blue-800 cursor-pointer"
          onClick={calculateTotal}
        >
          Calculate
        </span>
        {
          !updateOrder &&
            <span
              className="flex justify-center items-center rounded-md py-2 px-4 text-sm font-medium text-white shadow-sm bg-red-700 focus:ring-red-500 hover:bg-red-800 cursor-pointer"
              onClick={handleClearAll}
            >
              Clear all
            </span>
        }
        <Button text={buttonText}/>
      </div>
    </Form>
  )
}
