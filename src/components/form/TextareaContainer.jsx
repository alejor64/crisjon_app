import React from 'react'

export const TextareaContainer = ({text, name, value, setInputValue}) => {
  const onChange = (event) => {
    if(setInputValue){
      setInputValue(event.target.value)
    }
  }
  return (
    <div>
      <label htmlFor={name} className={`block text-sm font-medium text-gray-700`}>
        {text}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        name={name}
        className="mt-1 w-full rounded-md shadow border border-slate-200 resize-none p-2 focus:outline-none focus:ring-blue-700 focus:ring-1"
      />
    </div>
  )
}
