import { Button, InputLabelContainer } from "../../../../components/form"

export const InvoiceContainer = ({invoiceNumber, setInvoiceNumber, onClick, error}) => {
  return (
    <div className='flex flex-col items-center'>
      
      <div className='w-1/2 flex items-end'>
        <InputLabelContainer
          type="text"
          text="Invoice number"
          css="w-2/3 mr-3"
          inputValue={invoiceNumber}
          setInputValue={setInvoiceNumber}
        />
        <Button
          onClick={onClick}
          text="Create invoice"
          css='w-1/3 h-10 ml-3'
        />
      </div>
      {
        error &&
          <div className='w-1/2'>
            <p className='text-red-500'>Invoice number is required</p>
          </div>
      }
    </div>
  )
}
