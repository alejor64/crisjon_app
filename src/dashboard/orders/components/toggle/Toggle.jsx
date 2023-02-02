import "./toggle.css"

export const Toggle = ({checkedValue, setCheckedValue}) => {

  const onChange = () => {
    setCheckedValue(!checkedValue)
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={checkedValue} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  )
}
