import { useState } from "react"
import moment from 'moment'
import { Filter } from "../../../../components/filter"
import { InputLabelContainer, Label } from "../../../../components/form"
import { SelectClient } from "../../../clients/components"
import { DATA_PICKER_FORMAT, USA_DATE_FORMAT } from "../../../../utils/constants"
import { DateError } from "../../../../components/filter/errors"

export const EstimateFilters = ({estimatePrices, setEstimatePrices, prepareEstimatedPrices}) => {
  const today = moment()
  const lastMonth = moment().startOf('month')
  const [endDateValue, setEndDateValue] = useState(today.format(DATA_PICKER_FORMAT))
  const [startDate, setStartDate] = useState(lastMonth.format(DATA_PICKER_FORMAT))
  const [clientValue, setClientValue] = useState("")
  const [errorMsn, setErrorMsn] = useState("")

  const onClick = () => {
    let estimatesFiltered = estimatePrices
    if(startDate && endDateValue && startDate > endDateValue) {
      setErrorMsn(<DateError />)
    }else {
      setErrorMsn(<></>)
      if(startDate){
        const startDateFormatted = moment(startDate).format(USA_DATE_FORMAT)
        estimatesFiltered = estimatesFiltered.filter(estimatePrice => estimatePrice.createdAt >= startDateFormatted )
      }
      if(endDateValue){
        const endDateFormatted = moment(endDateValue).format(USA_DATE_FORMAT)
        estimatesFiltered = estimatesFiltered.filter(estimatePrice => estimatePrice.createdAt <= endDateFormatted)
      }
      if(clientValue){
        estimatesFiltered = estimatesFiltered.filter(estimatePrice => estimatePrice.clientName === clientValue)
      }
    }
    setEstimatePrices(prepareEstimatedPrices(estimatesFiltered))
  }

  return (
    <Filter onClick={onClick} errorMsn={errorMsn}>
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
    </Filter>
  )
}
