import { useState, useEffect } from 'react'

export const ContainerOneInput = ({name, clearAll, setclearAll}) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if(clearAll){
      setValue(0)
      setclearAll(false)
    }
  }, [clearAll])

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="w-[21rem]">
      <span className="mt-1 block w-full rounded-md shadow border border-slate-200 focus:outline-none">
        <span className="ml-1">$</span>
        <input
          type="number"
          name={`${name}Total`}
          className="ml-0 w-[96%] pl-0 py-1.5 md:py-2 sm:text-sm focus:outline-none"
          placeholder="Price"
          value={value}
          onChange={onChange}
          min="0"
        />
      </span>
    </div>
  )
}
