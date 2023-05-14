import { useState } from "react"
import { Form, Input, Button } from "../../../components/form"
import { ContainerInputs, ContainerOneInput, ContainerSelect } from "./form"
import { SelectClient } from "../../clients/components"

const Total = ({totalPrice}) => {
  return (
    <span className="font-semibold text-xl">
      Total: ${totalPrice}
    </span>
  )
}

export const EstimateForms = ({
  title,
  clientName, setClientName,
  cadPrice, setCadPrice,
  waxPrice, setWaxPrice,
  waxQuantity, setWaxQuantity,
  castingPrice, setCastingPrice,
  castingQuantity, setCastingQuantity,
  metalType, setMetalType,
  metalPrice, setMetalPrice,
  metalQuantity, setMetalQuantity,
  stoneQuantity, setStoneQuantity,
  stonePrice, setStonePrice,
  centerStonePrice, setCenterStonePrice,
  diamondWeight, setDiamondWeight,
  diamondPrice, setDiamondPrice,
  colorStone, setColorStone,
  cleaningPrice, setCleaningPrice,
  cleaningQuantity, setCleaningQuantity,
  polishingPrice, setPolishingPrice,
  polishingQuantity, setPolishingQuantity,
  assemblingPrice, setAssemblingPrice,
  assemblingQuantity, setAssemblingQuantity,
  findingsPrice, setFindingsPrice,
  findingsQuantity, setFindingsQuantity, 
  rhodioumPrice, setRhodioumPrice,
  rhodioumQuantity, setRhodioumQuantity,
  engravingPrice, setEngravingPrice,
  engravingQuantity, setEngravingQuantity,
  picturePrice, setPicturePrice,
  pictureQuantity, setPictureQuantity,
  totalPrice, setTotalPrice
}) => {
  const [clearAll, setclearAll] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const array = []
    const {elements} = e.target
    for(const property in elements){
      if(property.includes('Total')){
        const value = parseFloat(elements[property].value.replace('$', ''))
        array.push(value)
      }
    }
    setTotalPrice(array.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
  }

  const onClick = () => {
    setclearAll(true)
    setTotalPrice(0)
    setselectValue("")
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
        <ContainerInputs name="dimonds" clearAll={clearAll} setclearAll={setclearAll} valuePrice={diamondPrice} setValuePrice={setDiamondPrice} valueQuantity={diamondWeight} setValueQuantity={setDiamondWeight} />
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
        <Button text="Clear all" deleteButton={true} onClick={onClick}/>
        <Button text="Calculate" />
      </div>
    </Form>
  )
}
