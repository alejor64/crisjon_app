import React, { useEffect, useState } from 'react'
import { getAllItems } from '../../../../api/orders/items'
import { SelectInputContainer } from '../../../../components/form'
import { ITEMS } from '../../../../utils/constants'
import { sortArray } from '../../../../utils/functions'

export const ItemOptions = ({value, setValue, disabled}) => {
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
      disabled={disabled}
    >
      <option value="">-- Item --</option>
      {
        sortArray(items, "name").map(item => (
          <option value={item.name} key={item._id}>{item.name}</option>
        ))
      }
      <option value="other">Other</option>
    </SelectInputContainer>
  )
}
