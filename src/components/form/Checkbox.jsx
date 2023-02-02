
export const Checkbox = ({checked, setChecked, inputCss, text, textCss}) => {

  const onChangeDone = () => {
    setChecked(!checked)
  }

  return (
    <div className={inputCss}>
      <input
        type="checkbox"
        id="done"
        name="done_value"
        checked={checked}
        onChange={onChangeDone}
      />
      <span className={textCss}>
        {text}
      </span>
    </div>
  )
}
