import { useState } from "react"
import { Form, Button } from "../../../components/form"
import { ContainerInputs, ContainerOneInput, ContainerSelect } from "./form"
import { SelectClient } from "../../clients/components"

const Total = ({totalPrice}) => {
  return (
    <span className="font-semibold text-xl">
      Total: ${totalPrice}
    </span>
  )
}

export const EstimateForms = ({ title, estimate }) => {
  const [clearAll, setclearAll] = useState(false)
  const [name, setName] = useState(estimate?.name || "")
  const [clientName, setClientName] = useState(estimate?.clientName || "")
  const [cadPrice, setCadPrice] = useState(estimate?.cadPrice || 0)
  const [waxPrice, setWaxPrice] = useState(estimate?.waxPrice || 0)
  const [waxQuantity, setWaxQuantity] = useState(estimate?.waxQuantity || 0)
  const [castingPrice, setCastingPrice] = useState(estimate?.castingPrice || 0)
  const [castingQuantity, setCastingQuantity] = useState(estimate?.castingQuantity || 0)
  const [metalType, setMetalType] = useState(estimate?.metalType || "")
  const [metalPrice, setMetalPrice] = useState(estimate?.metalPrice || 0)
  const [metalQuantity, setMetalQuantity] = useState(estimate?.metalQuantity || 0)
  const [stonePrice, setStonePrice] = useState(estimate?.stonePrice || 0)
  const [stoneQuantity, setStoneQuantity] = useState(estimate?.stoneQuantity || 0)
  const [centerStonePrice, setCenterStonePrice] = useState(estimate?.centerStonePrice || 0)
  const [cleaningPrice, setCleaningPrice] = useState(estimate?.cleaningPrice || 0)
  const [cleaningQuantity, setCleaningQuantity] = useState(estimate?.cleaningQuantity || 0)
  const [diamondPrice, setDiamondPrice] = useState(estimate?.diamondPrice || 0)
  const [diamondQuantity, setDiamondQuantity] = useState(estimate?.diamondQuantity || 0)
  const [colorStone, setColorStone] = useState(estimate?.colorStone || 0)
  const [polishingPrice, setPolishingPrice] = useState(estimate?.polishingPrice || 0)
  const [polishingQuantity, setPolishingQuantity] = useState(estimate?.polishingQuantity || 0)
  const [assemblingPrice, setAssemblingPrice] = useState(estimate?.assemblingPrice || 0)
  const [assemblingQuantity, setAssemblingQuantity] = useState(estimate?.assemblingQuantity || 0)
  const [findingsPrice, setFindingsPrice] = useState(estimate?.findingsPrice || 0)
  const [findingsQuantity, setFindingsQuantity] = useState(estimate?.findingsQuantity || 0)
  const [rhodioumPrice, setRhodioumPrice] = useState(estimate?.rhodioumPrice || 0)
  const [rhodioumQuantity, setRhodioumQuantity] = useState(estimate?.rhodioumQuantity || 0)
  const [engravingPrice, setEngravingPrice] = useState(estimate?.engravingPrice || 0)
  const [engravingQuantity, setEngravingQuantity] = useState(estimate?.engravingQuantity || 0)
  const [picturePrice, setPicturePrice] = useState(estimate?.picturePrice || 0)
  const [pictureQuantity, setPictureQuantity] = useState(estimate?.pictureQuantity || 0)
  const [totalPrice, setTotalPrice] = useState(estimate?.totalPrice || 0)

  const getAllStates = () => {
    return {
     name, clientName, cadPrice, waxPrice, waxQuantity, castingPrice, castingQuantity, metalType, metalPrice, metalQuantity, stonePrice, stoneQuantity, centerStonePrice, cleaningPrice, cleaningQuantity, diamondPrice, diamondQuantity, colorStone, polishingPrice, polishingQuantity, assemblingPrice, assemblingQuantity, findingsPrice, findingsQuantity, rhodioumPrice, rhodioumQuantity, engravingPrice, engravingQuantity, picturePrice, pictureQuantity, totalPrice,
    }
  }

  const calculateTotal = () => {
    const total = cadPrice + (waxPrice * waxQuantity) + (castingPrice * castingQuantity) + (metalPrice * metalQuantity) + (stonePrice * stoneQuantity) + (centerStonePrice) * (diamondPrice * diamondQuantity) + (cleaningPrice * cleaningQuantity) + (colorStone) + (polishingPrice * polishingQuantity) + (assemblingPrice * assemblingQuantity) + (findingsPrice * findingsQuantity) + (rhodioumPrice * rhodioumQuantity) + (engravingPrice * engravingQuantity) + (picturePrice * pictureQuantity)
    setTotalPrice(total)
  }

  const handleClearAll = () => {
    setclearAll(true)
    setMetalType("")
    setTotalPrice(0)
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const body = getAllStates();
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
          <SelectClient name="client" client={clientName} setClient={setClientName} />
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
        <span>METAL</span>
      </div>
      <div className="flex mb-7 items-center">
        <ContainerSelect selectValue={metalType} setselectValue={setMetalType} />
        <ContainerInputs name="metal" clearAll={clearAll} setclearAll={setclearAll} valuePrice={metalPrice} setValuePrice={setMetalPrice} valueQuantity={metalQuantity} setValueQuantity={setMetalQuantity} />
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
        <span className="w-[120px]">Rhodioum</span>
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
        <Total totalPrice={totalPrice} />
      </div>
      <div className="flex mb-7 justify-around">
        <span
          className="flex justify-center items-center rounded-md py-2 px-4 text-sm font-medium text-white shadow-sm bg-blue-700 focus:ring-blue-500 hover:bg-blue-800 cursor-pointer"
          onClick={calculateTotal}
        >
          Calculate
        </span>
        <span
          className="flex justify-center items-center rounded-md py-2 px-4 text-sm font-medium text-white shadow-sm bg-red-700 focus:ring-red-500 hover:bg-red-800 cursor-pointer"
          onClick={handleClearAll}
        >
          Clear all
        </span>
        <Button text="Create Estimate"/>
      </div>
    </Form>
  )
}
