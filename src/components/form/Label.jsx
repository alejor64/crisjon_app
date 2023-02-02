export const Label = ({text, htmlFor, css}) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${css}`}>
      {text}
    </label>
  )
}
