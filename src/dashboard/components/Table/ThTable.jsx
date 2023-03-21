import { useEffect, useState } from "react"

export const ThTable = ({text, rowsInTable, setOrdersChecked, ordersChecked, css = ''}) => {
  const isCheckBox = text == 'Checked'
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(ordersChecked?.length === rowsInTable?.length)
  }, [ordersChecked])
  

  const onChange = (e) => {
    const {checked} = e.target
    if(checked){
      setIsChecked(true)
      setOrdersChecked(rowsInTable.map(order => order._id))
    }else {
      setIsChecked(false)
      setOrdersChecked([])
    }
  }

  return (
    <th
      scope="col"
      className={`text-sm font-medium text-gray-900 px-6 py-4 text-left ${isCheckBox ? css : ''}`}
    >
      {
        isCheckBox &&
          <input
            type="checkbox"
            className="mr-2"
            onChange={onChange}
            checked={isChecked}
          />
      }
      {text}
    </th>
  )
}
