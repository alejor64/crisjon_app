import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import moment from "moment"
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons"
import { Button, Form, InputLabelContainer, SelectInputContainer } from "../../../../components/form"
import { Table } from "../../../components/Table"
import { editInvoiceById, getInvoiceById } from "../../../../api/invoice"
import { formatCurrency } from "../../../../utils/functions"
import { DATA_PICKER_FORMAT, USA_DATE_FORMAT } from "../../../../utils/constants"

const thList = ['Client Job name', 'Item', 'Delivered Date', 'Price']
const rowsToShow = ['id', 'clientName', 'item', 'deliveredDate', 'price']

export const InvoiceForm = ({title}) => {
  const { invoiceId } = useParams()
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({})
  const [paid, setPaid] = useState(false)
  const [paymentType, setPaymentType] = useState("")
  const [pricePayed, setPricePayed] = useState(0)
  const [checkNumber, setCheckNumber] = useState("")
  const [outstandingBalance, setOutstandingBalance] = useState(0)

  useEffect(() => {
    getInvoiceById(invoiceId)
      .then(({invoice}) => {
        setInvoice(invoice)
        setPaid(invoice.payed)
        setPricePayed(invoice.pricePayed || 0)
        setPaymentType(invoice.paymentType || "")
        setCheckNumber(invoice.checkNumber || "")
        setOutstandingBalance(invoice.outstandingBalance || 0)
      })
  }, [invoiceId])

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
    return {
      number: invoice.number,
      clientName: invoice.clientName,
      totalPrice: invoice.totalPrice,
      startDate: invoice.startDate,
      endDate: invoice.endDate,
      orders: invoice.ordersPayed,
      payed: paid,
      paymentType,
      pricePayed,
      checkNumber,
    }
  }

  const updateInvoice = async() => {
    const response = await editInvoiceById(invoiceId, bodyToUpdate())
    if(response.invoice) {
      navigate(`/invoice/list`)
      const text = `The invoice ${invoice.number} was successfully updated`
      shootSwal('Success!', text, 'success')
    }else{
      const text = response[0].msg
      shootSwal('Error!', text, 'error')
    }
  }

  const ordersWithDateFormatted = (orders) => {
    return orders.map(order => ({
      ...order,
      deliveredDate: moment(order.deliveredDate).format(USA_DATE_FORMAT),
      price: formatCurrency(order.price)
    }))
  }

  const validatePrices = async() => {
    if(invoice.totalPrice < pricePayed){
      const text = `Price paid ${pricePayed} should not be grater than price ${totalPrice}`
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
                inputValue={invoice.number}
              />
              <InputLabelContainer
                type="text"
                text="Client Name"
                placeholder="Crisjon"
                name="clientName"
                css="ml-3"
                readOnly={true}
                inputValue={invoice.clientName}
              />
              <InputLabelContainer
                type="text"
                text="Total Price"
                placeholder={0}
                name="totalPrice"
                css="ml-3"
                readOnly={true}
                inputValue={formatCurrency(invoice.totalPrice)}
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
                inputValue={moment(invoice?.startDate).format(DATA_PICKER_FORMAT)}
              />
              <InputLabelContainer
                type="date"
                text="End Date"
                name="endDate"
                css="flex flex-col text-center ml-3"
                readOnly={true}
                inputValue={moment(invoice?.endDate).format(DATA_PICKER_FORMAT)}
              />
            </div>
            <div className="mb-7">
              <div className="flex justify-center mb-2">
                <p className="font-medium text-gray-700">Orders</p>
              </div>
              <Table
                thList={thList}
                tdList={ordersWithDateFormatted(invoice?.ordersPayed)}
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
                  checked={paid}
                  onChange={() => onChange(setPaid, paid)}
                />
                <span className='ml-1'>Mark as paid</span>
              </div>
              <div className="w-[85%] grid gap-3 grid-cols-3">
                {
                  paid &&
                    <>
                      <div>
                        <InputLabelContainer
                          type="number"
                          text="Price paid"
                          name="pricePayed"
                          inputValue={pricePayed}
                          setInputValue={setPricePayed}
                          required={pricePayed}
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
