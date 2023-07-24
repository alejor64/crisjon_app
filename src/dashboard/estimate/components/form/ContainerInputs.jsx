import { useEffect, useState } from "react"

export const ContainerInputs = ({name, clearAll = false, required = false, setclearAll, valuePrice, setValuePrice, valueQuantity, setValueQuantity}) => {
  const [total, setTotal] = useState(`$${valuePrice*valueQuantity}`);
  const [quantityInput, setQuantityInput] = useState(valueQuantity.toString().replaceAll('.', ','));
  const [priceInput, setPriceInput] = useState(valuePrice.toString().replaceAll('.', ','));
  const decimalRegex = /^\d*\,?\d*$/;

  useEffect(() => {
    if(clearAll){
      setValuePrice(0)
      setValueQuantity(0)
      setTotal(`$0`)
      setclearAll(false)
    }
  }, [clearAll])

  const onChagePrice = (event) => {
    const { value } = event.target
    if (decimalRegex.test(value)) {
      setPriceInput(value);
      const total = parseFloat(value.replaceAll(',', '.'));
      setValuePrice(total);
      const totalValue = parseFloat(total * valueQuantity).toFixed(2)
      setTotal(`$${totalValue}`)
    }
  }
  
  const onChageQuantity = (event) => {
    const { value } = event.target;
    if (decimalRegex.test(value)) {
      setQuantityInput(value);
      const quantity = parseFloat(value.replaceAll(',', '.') || 0);
      setValueQuantity(quantity)
      const totalValue = parseFloat(valuePrice * quantity).toFixed(2);
      setTotal(`$${totalValue.replaceAll('.', ',')}`)
    }
  }

  return (
    <div className="flex w-full">
      <span className="mt-1 ml-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none">
        <span className="ml-1">$</span>
        <input
          type="text"
          name={`${name}Price`}
          className="ml- w-[96%] pl-0 py-1.5 md:py-2 sm:text-sm focus:outline-none"
          placeholder="price"
          required={required}
          value={priceInput}
          onChange={onChagePrice}
        />
      </span> 
      <input
        type="text"
        name={`${name}Quantity`}
        placeholder="quantity"
        required={required}
        className="mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none sm:text-sm ml-2"
        value={quantityInput}
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
