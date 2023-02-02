
export const Select = ({children, name, value, onChange, required = false}) => {
  return (
    <select
      name={name}
      className="mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 sm:text-sm"
      required={required}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}
