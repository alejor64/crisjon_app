import { useEffect, useState } from "react";

export const ContainerMetalInputs = ({onChange, metalType, metalPrice, metalQuantity, setMetalQuantity}) => {
  const [total, setTotal] = useState(`$${metalPrice*metalQuantity}`);
  const [quantityInput, setQuantityInput] = useState(metalQuantity.toString().replaceAll('.', ','));

  useEffect(() => {
    const totalValue = parseFloat(metalPrice * metalQuantity).toFixed(2)
    setTotal(`$${totalValue}`)
  }, [metalType])

  const onChangeMetalQuantity = (event) => {
    const { value } = event.target;
    const decimalRegex = /^\d*\,?\d*$/;
    if (decimalRegex.test(value)) {
      setQuantityInput(value);
      const quantity = parseFloat(value.replaceAll(',', '.') || 0);
      setMetalQuantity(quantity);
      const totalValue = parseFloat(metalPrice * quantity).toFixed(2);
      setTotal(`$${totalValue.replaceAll('.', ',')}`)
    }
  }

  return (
    <>
      <select
        required
        className="mt-1 pl-2 py-1.5 md:py-2 block w-[120px] rounded-md shadow border border-slate-200 sm:text-sm"
        value={metalType}
        onChange={onChange}
      >
        <option value="" >- Metal -</option>
        <option value="10k">10k</option>
        <option value="14k">14k</option>
        <option value="18k">18k</option>
      </select>
      <div className="flex w-full">
        <span className="mt-1 ml-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none">
          <span className="ml-1">$</span>
          <input
            type="number"
            name={`metalPrice`}
            className="ml- w-[96%] pl-0 py-1.5 md:py-2 sm:text-sm focus:outline-none"
            placeholder="price"
            value={metalPrice}
            readOnly
          />
        </span> 
        <input
          type="text"
          name={`metalQuantity`}
          placeholder="quantity"
          required
          className="mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none sm:text-sm ml-2"
          value={quantityInput.replace('.', ',')}
          onChange={onChangeMetalQuantity}
          min="0"
        />
        <input
          type="text"
          name={`metalTotal`}
          placeholder="$0"
          className="mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none sm:text-sm ml-2"
          value={total.replaceAll('.', ',')}
          readOnly
        />
      </div>
    </>
  )
}

