import { Toggle } from '../../dashboard/orders/components'

export const ToggleContainer = ({text, checkedValue, setCheckedValue}) => {
  return (
    <div className="flex justify-center items-center py-2 min-w-full max-w-full sm:px-6 lg:px-8">
      <span className='mr-2'>
        { text }
      </span>
      <Toggle checkedValue={checkedValue} setCheckedValue={setCheckedValue} />
    </div>
  )
}
