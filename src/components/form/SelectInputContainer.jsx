import { Label, Select } from "./"

export const SelectInputContainer = ({name, text, css, children, required, value, setValue, disabled}) => {
  return (
    <div className={`w-full ${css} mb-3`}>
      <Label htmlFor={name} text={text} />
      <Select name={name} required={required} value={value} setValue={setValue} disabled={disabled}>
        {children}
      </Select>
    </div>
  )
}
