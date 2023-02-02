import { useState } from "react"
import { Filter } from "../../../../components/filter"
import { Checkbox, InputLabelContainer, Label, Select } from "../../../../components/form"

export const OrderFilters = ({doneCheckbox, setDoneCheckbox, returnedCheckbox, setReturnedCheckbox, startDate, setStartDate, endDateValue, setEndDateValue, clientValue, setClientValue, onClick, error}) => {

  const onChange = (e) => {
    setClientValue(e.target.value)
  }

  return (
    <Filter onClick={onClick} error={error}>
      <div>
        <Checkbox
          checked={doneCheckbox}
          setChecked={setDoneCheckbox}
          inputCss="flex flex-col-reverse"
          text="Done orders"
          textCss="mb-1"
        />
      </div>
      <div className="w-1/5">
        <InputLabelContainer
          type="date"
          text="Start date"
          name="start_date"
          css="flex flex-col text-center px-2"
          inputValue={startDate}
          setInputValue={setStartDate}
        />
      </div>
      <div className="w-1/5">
        <InputLabelContainer
          type="date"
          text="End date"
          name="end_date"
          css="flex flex-col text-center px-2"
          inputValue={endDateValue}
          setInputValue={setEndDateValue}
        />
      </div>
      <div className="w-1/5 flex flex-col text-center">
        <Label htmlFor="client" text="Client" />
        <Select name="clients" value={clientValue} onChange={onChange}>
          <option className='text-center' value="">-- Select --</option>
          <option className='text-center' valie="Alejor">Alejor</option>
          <option className='text-center' value="Erika">Erika</option>
        </Select>
      </div>
      <div>
        <Checkbox
          checked={returnedCheckbox}
          setChecked={setReturnedCheckbox}
          inputCss="flex flex-col-reverse"
          text="Delivered orders"
          textCss="mb-1"
        />
      </div>
    </Filter>
  )
}
