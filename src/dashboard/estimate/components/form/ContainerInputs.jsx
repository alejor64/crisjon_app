import { useEffect, useState } from "react"

export const ContainerInputs = ({name, clearAll = false, setclearAll, valuePrice, setValuePrice, valueQuantity, setValueQuantity}) => {
  const [total, setTotal] = useState(`$${valuePrice*valueQuantity}`)

  useEffect(() => {
    if(clearAll){
      setValuePrice(0)
      setValueQuantity(0)
      setTotal(`$0`)
      setclearAll(false)
    }
  }, [clearAll])

  const onChagePrice = (event) => {
    setValuePrice(event.target.value)
    const totalValue = parseFloat(event.target.value * valueQuantity).toFixed(2)
    setTotal(`$${totalValue}`)
  }
  
  const onChageQuantity = (event) => {
    setValueQuantity(event.target.value)
    const totalValue = parseFloat(valuePrice * event.target.value).toFixed(2)
    setTotal(`$${totalValue}`)
  }

  return (
    <div className="flex w-full">
        <span className="mt-1 ml-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none">
          <span className="ml-1">$</span>
          <input
            type="number"
            name={`${name}Price`}
            className="ml- w-[96%] pl-0 py-1.5 md:py-2 sm:text-sm focus:outline-none"
            placeholder="price"
            value={valuePrice}
            onChange={onChagePrice}
          />
        </span> 
        <input
          type="number"
          name={`${name}Quantity`}
          placeholder="quantity"
          className="mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none sm:text-sm ml-2"
          value={valueQuantity}
          onChange={onChageQuantity}
          min="0"
        />
        <input
          type="text"
          name={`${name}Total`}
          placeholder="$0"
          className="mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none sm:text-sm ml-2"
          value={total}
          disabled
        />
    </div>
  )
}
