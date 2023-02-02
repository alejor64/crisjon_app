import React, { useState } from 'react'

export const Input = ({type, name, placeholder, inputValue, setInputValue, readOnly = false, onKeyUp, css, required = false}) => {
  const [value, setValue] = useState(inputValue || '')
  const onChage = (event) => {
    setValue(event.target.value)
    if(setInputValue){
      setInputValue(event.target.value)
    }
  }
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      autoComplete='off'
      value={value}
      onChange={onChage}
      onKeyUp={onKeyUp}
      readOnly={readOnly}
      className={`mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none focus:ring-blue-700 focus:ring-1 sm:text-sm ${css}`}
      required={required}
    />
  )
}
