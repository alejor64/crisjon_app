import { Filter } from "../../../../components/filter"
import { Checkbox, InputLabelContainer, Label } from "../../../../components/form"
import { SelectClient } from "../../../clients/components"

export const OrderFilters = ({doneCheckbox, setDoneCheckbox, returnedCheckbox, setReturnedCheckbox, startDate, setStartDate, endDateValue, setEndDateValue, clientValue, setClientValue, onClick, errorMsn}) => {

  return (
    <Filter onClick={onClick} errorMsn={errorMsn}>
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
        <SelectClient name="clients" client={clientValue} setClient={setClientValue} />
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
