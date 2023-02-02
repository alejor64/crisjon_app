
export const ContainerSelect = ({selectValue, setselectValue}) => {
  const onChange = (e) => {
    setselectValue(e.target.value)
  }

  return (
    <select
      className="mt-1 pl-2 py-1.5 md:py-2 block w-[120px] rounded-md shadow border border-slate-200 sm:text-sm"
      value={selectValue}
      onChange={onChange}
    >
      <option value="" >- Metal -</option>
      <option value="10k">10k</option>
      <option value="14k">14k</option>
      <option value="18k">18k</option>
      <option value="silver">Silver</option>
      <option value="plat">Plat</option>
    </select>
  )
}
