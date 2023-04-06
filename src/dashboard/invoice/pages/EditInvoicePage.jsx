
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import { DashboardLayout } from "../../layout"
import { InvoiceForm, InvoicePdf } from "../components"
import { CLIENTS, DATA_PICKER_FORMAT, USA_DATE_FORMAT } from "../../../utils/constants"
import { getInvoiceById } from "../../../api/invoice"
import { formatCurrency } from "../../../utils/functions"

export const EditInvoicePage = () => {
  const { invoiceId } = useParams()
  const navigate = useNavigate()
  const [showInvoicePdf, setShowInvoicePdf] = useState(false)
  const [invoice, setInvoice] = useState({})
  const [number, setNumber] = useState(0)
  const [clientName, setClientName] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [orders, setOrders] = useState([])
  const [payed, setPayed] = useState(false)
  const [paymentType, setPaymentType] = useState("")
  const [pricePayed, setPricePayed] = useState(0)
  const [checkNumber, setCheckNumber] = useState("")
  const [outstandingBalance, setOutstandingBalance] = useState(0)

  const ordersWithDateFormatted = (orders) => {
    return orders.map(order => ({
      ...order,
      deliveredDate: moment(order.deliveredDate).format(USA_DATE_FORMAT),
      price: formatCurrency(order.price)
    }))
  }

  const getOutStandingBalance = (clientName) => {
    const clients = JSON.parse(sessionStorage.getItem(CLIENTS) || '[]')
    const client = clients.find(client => client.name === clientName)
    return client.outstandingBalance
  }

  useEffect(() => {
    getInvoiceById(invoiceId)
      .then(response => {
        if(response?.invoice) {
          const { invoice: invoiceResponse } = response
          setInvoice(invoiceResponse)
          setNumber(invoiceResponse?.number)
          setClientName(invoiceResponse?.clientName)
          setTotalPrice(invoiceResponse?.totalPrice)
          setStartDate(moment(invoiceResponse?.startDate).format(DATA_PICKER_FORMAT))
          setEndDate(moment(invoiceResponse?.endDate).format(DATA_PICKER_FORMAT))
          setPayed(invoiceResponse?.payed)
          setPaymentType(invoiceResponse?.paymentType)
          setPricePayed(invoiceResponse?.pricePayed)
          setCheckNumber(invoiceResponse?.checkNumber)
          setOutstandingBalance(getOutStandingBalance(invoiceResponse?.clientName))
          setOrders(ordersWithDateFormatted(invoiceResponse?.ordersPayed))
        }
      })
  }, [invoiceId, setInvoice, setNumber, setClientName, setTotalPrice, setStartDate, setEndDate, setOrders])


  const goBackClic = () => {
    navigate(-1)
  }

  const generatePDF = () => {
    setShowInvoicePdf(!showInvoicePdf)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className='container flex justify-between mx-auto max-w-7xl px-2 mt-2'>
          <p
            onClick={goBackClic}
            className='underline text-blue-700 cursor-pointer'
          >
            Go back
          </p>
          <p
            onClick={generatePDF}
            className='underline text-blue-700 cursor-pointer'
          >
            Generate PDF
          </p>
        </div>
        <>
          {
            showInvoicePdf
            ?
              <InvoicePdf invoice={invoice} />
            :
              <InvoiceForm
                title="Edit Invoice"
                invoice={invoice}
                number={number}
                clientName={clientName}
                totalPrice={totalPrice}
                startDate={startDate}
                endDate={endDate}
                orders={orders}
                payed={payed}
                paymentType={paymentType}
                pricePayed={pricePayed}
                checkNumber={checkNumber}
                outstandingBalance={outstandingBalance}
                setShowInvoicePdf={setShowInvoicePdf}
                setPayed={setPayed}
                setPaymentType={setPaymentType}
                setPricePayed={setPricePayed}
                setCheckNumber={setCheckNumber}
              />
          }
        </>
      </div>
    </DashboardLayout>
  )
}