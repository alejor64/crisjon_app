import React from 'react'

export const TdTable = ({text, css = ''}) => {
  return (
    <td className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ${css}`}>
      {text}
    </td>
  )
}