import { Label, Input } from "./"

export const InputLabelContainer = ({type, text, placeholder, name, css, inputValue, setInputValue, required, readOnly = false}) => {
  return (
    <div className={`w-full ${css}`}>
      <Label htmlFor={name} text={text} />
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        inputValue={inputValue}
        setInputValue={setInputValue}
        required={required}
        readOnly={readOnly}
      />
    </div>
  )
}
