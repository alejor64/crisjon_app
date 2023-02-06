import { Label, Select } from "./"

export const SelectInputContainer = ({name, text, css, children, required, value, setValue}) => {
  return (
    <div className={`w-full ${css} mb-3`}>
      <Label htmlFor={name} text={text} />
      <Select name={name} required={required} value={value} setValue={setValue}>
        {children}
      </Select>
    </div>
  )
}
