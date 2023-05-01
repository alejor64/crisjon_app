import Swal from "sweetalert2"
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons"
import { Button, Form, InputLabelContainer, SelectInputContainer } from "../../../../components/form"
import { Table } from "../../../components/Table"
import { editInvoiceById } from "../../../../api/invoice"
import { formatCurrency } from "../../../../utils/functions"
import { useParams } from "react-router-dom"

const thList = ['Client Job name', 'Item', 'Delivered Date', 'Price']
const rowsToShow = ['id', 'clientName', 'item', 'deliveredDate', 'price']

export const InvoiceForm = ({title,invoice, number, clientName, totalPrice, startDate, endDate, orders, payed, paymentType, pricePayed, checkNumber, outstandingBalance, setPayed, setPaymentType, setPricePayed, setCheckNumber}) => {
  const {invoiceId} = useParams()

  const onChange = (setValue, value) => {
    setValue(!value)
  }

  const shootSwal = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 2000
    })
  }

  const bodyToUpdate = () => {
    const outstandingBalanceCalculated = totalPrice - pricePayed
    return {
      number,
      clientName,
      totalPrice,
      startDate,
      endDate,
      orders,
      payed,
      paymentType,
      pricePayed,
      checkNumber,
      outstandingBalance: outstandingBalanceCalculated
    }
  }

  const updateInvoice = async() => {
    const response = await editInvoiceById(invoiceId, bodyToUpdate())
    if(response.invoice) {
      const text = `The invoice ${number} was successfully updated`
      shootSwal('Success!', text, 'success')
    }else{
      const text = response[0].msg
      shootSwal('Error!', text, 'error')
    }
  }

  const validatePrices = async() => {
    if(totalPrice < pricePayed){
      const text = `Price payed ${pricePayed} should not be grater than price ${totalPrice}`
      shootSwal('Error!', text, 'error')
    }else {
      await updateInvoice()
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    await validatePrices()
  }

  return (
    <Form title={title} onSubmit={onSubmit}>
      {
        invoice?.number &&
          <>
            <div className="flex mb-7">
              <InputLabelContainer
                type="number"
                text="Invoice Number"
                placeholder="123456"
                name="number"
                readOnly={true}
                inputValue={number}
              />
              <InputLabelContainer
                type="text"
                text="Client Name"
                placeholder="Crisjon"
                name="clientName"
                css="ml-3"
                readOnly={true}
                inputValue={clientName}
              />
              <InputLabelContainer
                type="text"
                text="Total Price"
                placeholder={0}
                name="totalPrice"
                css="ml-3"
                readOnly={true}
                inputValue={formatCurrency(totalPrice)}
              />
              <InputLabelContainer
                type="text"
                text="Pending Balance"
                placeholder={0}
                name="outstandingBalance"
                css="ml-3"
                readOnly={true}
                inputValue={formatCurrency(outstandingBalance)}
              />
            </div>
            <div className="flex mb-7">
              <InputLabelContainer
                type="date"
                text="Start Date"
                name="startDate"
                css="flex flex-col text-center"
                readOnly={true}
                inputValue={startDate}
              />
              <InputLabelContainer
                type="date"
                text="End Date"
                name="endDate"
                css="flex flex-col text-center ml-3"
                readOnly={true}
                inputValue={endDate}
              />
            </div>
            <div className="mb-7">
              <div className="flex justify-center mb-2">
                <p className="font-medium text-gray-700">Orders</p>
              </div>
              <Table
                thList={thList}
                tdList={orders}
                route='order'
                rowsToShow={rowsToShow}
                showInput={false}
                showTrash={false}
              />
            </div>
            <div className="flex mb-7 justify-between items-center">
              <div className="w-[15%]">
                <input
                  type="checkbox"
                  id="payes"
                  name="payes"
                  checked={payed}
                  onChange={() => onChange(setPayed, payed)}
                />
                <span className='ml-1'>Mark as paid</span>
              </div>
              <div className="w-[85%] grid gap-3 grid-cols-3">
                {
                  payed &&
                    <>
                      <div>
                        <InputLabelContainer
                          type="number"
                          text="Price paid"
                          name="pricePayed"
                          inputValue={pricePayed}
                          setInputValue={setPricePayed}
                          required={payed}
                        />
                      </div>
                      <div>
                        <SelectInputContainer
                          name="payment_type"
                          text="Payment type"
                          required={pricePayed}
                          value={paymentType}
                          setValue={setPaymentType}
                        >
                          <option value="">-- payment type --</option>
                          <option value="cash">Cash</option>
                          <option value="check">Check</option>
                        </SelectInputContainer>
                      </div>
                      {
                        paymentType == 'check' &&
                          <div>
                            <InputLabelContainer
                              type="number"
                              text="Check Number"
                              name="checkNumber"
                              required={pricePayed}
                              inputValue={checkNumber}
                              setInputValue={setCheckNumber}
                            />
                          </div>
                      }
                    </>
                }
              </div>
            </div>
            <div className="flex mb-7 justify-center">
              <Button
                text='Edit invoice'
                icon={faFileInvoiceDollar}
              />
            </div>
          </>
      }
    </Form>
  )
}
