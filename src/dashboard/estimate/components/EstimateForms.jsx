import { useState } from "react"
import { Form, Input, Button } from "../../../components/form"
import { ContainerInputs, ContainerOneInput, ContainerSelect } from "./form"

const Total = ({totalPrice}) => {
  return (
    <span className="font-semibold text-xl">
      Total: ${totalPrice}
    </span>
  )
}

export const EstimateForms = ({title}) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectValue, setselectValue] = useState("")
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
        <span className="w-[120px]">NOMBRE ESTIMADO</span>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">CLIENTE</span>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">CAD</span>
        <ContainerOneInput name="cad" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">WAX</span>
        <ContainerInputs name="wax" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">CASTING</span>
        <ContainerInputs name="casting" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 justify-center">
        <span>METAL</span>
      </div>
      <div className="flex mb-7 items-center">
        <ContainerSelect selectValue={selectValue} setselectValue={setselectValue} />
        <ContainerInputs name="metal" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 justify-center">
        <span>LABOR</span>
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Setting Stones</span>
        <ContainerInputs name="stones" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Setting Center Stone</span>
        <ContainerOneInput name="settingCenterStone" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Cleaning</span>
        <ContainerInputs name="cleaning" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Diamonds</span>
        <ContainerInputs name="dimonds" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Color Stones</span>
        <ContainerOneInput name="colorStones" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Polishing</span>
        <ContainerInputs name="pollishing" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Assembling</span>
        <ContainerInputs name="assembling" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Findings</span>
        <ContainerInputs name="findings" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Rhodioum</span>
        <ContainerInputs name="rhodioum" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Engraving</span>
        <ContainerInputs name="engraving" clearAll={clearAll} setclearAll={setclearAll} />
      </div>
      <div className="flex mb-7 items-center">
        <span className="w-[120px]">Picture</span>
        <ContainerInputs name="picture" clearAll={clearAll} setclearAll={setclearAll} />
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
