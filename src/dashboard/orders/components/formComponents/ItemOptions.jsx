import React, { useEffect, useState } from 'react'
import { getAllItems } from '../../../../api/orders/items'
import { SelectInputContainer } from '../../../../components/form'
import { ITEMS } from '../../../../utils/constants'

export const ItemOptions = ({value, setValue}) => {
  const itemsInSS = JSON.parse(sessionStorage.getItem(ITEMS) || "[]")
  const [items, setiItems] = useState(itemsInSS)

  useEffect(() => {
    getAllItems()
      .then(response => setiItems(response))
  }, [])
  
  return (
    <SelectInputContainer
      name="item"
      text="Item"
      required={true}
      value={value}
      setValue={setValue}
    >
      <option value="">-- Item --</option>
      {
        items.map(item => (
          <option value={item.name} key={item._id}>{item.name}</option>
        ))
      }
      <option value="other">Other</option>
    </SelectInputContainer>
  )
}
