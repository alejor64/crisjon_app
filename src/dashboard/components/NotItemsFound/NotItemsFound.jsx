import React from 'react'

export const NotItemsFound = ({text}) => {
  return (
    <div className="flex justify-center">
      <div className="p-4 flex justify-center md:w-2/3 sm:w-full border bg-gray-100">
        <h2>There's not {text} to show</h2>
      </div>
    </div>
  )
}
