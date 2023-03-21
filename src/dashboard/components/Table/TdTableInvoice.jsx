import { useEffect, useState } from "react"

export const TdTableInvoice = ({row, setOrdersChecked, ordersChecked}) => {
  const [isChecked, setIsChecked] = useState(false)
  const onChange = (e) => {
    const {checked, id } = e.target
    if(checked){
      setOrdersChecked(order => order.concat([id]))
    }else{
      setOrdersChecked(order => order.filter(orderId => id !== orderId))
    }
  }

  useEffect(() => {
    setIsChecked(ordersChecked.includes(row._id))
  }, [ordersChecked, row])
  

  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <input
        type="checkbox"
        checked={isChecked}
        id={row._id}
        onChange={onChange}
      />
    </td>
  )
}
