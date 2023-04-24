import { useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faDownload } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import { CLIENTS, USA_DATE_FORMAT } from "../../../../utils/constants"
import { formatCurrency } from "../../../../utils/functions"
import { Table } from "../../../components/Table"
import { useReactToPrint } from "react-to-print"

const thList = ['Id', 'Item', 'Service', 'Delivered Date', 'Price']
const rowsToShow = ['id', 'jobId', 'item', 'service', 'deliveredDate', 'price']

export const InvoicePdf = ({invoice}) => {
  const clients = JSON.parse(sessionStorage.getItem(CLIENTS) || '[]')
  const client = clients.find(clientInfo => clientInfo.name === invoice.clientName)
  const invoicePDF = useRef()
  const [isMouseHover, setIsMouseHover] = useState(false)

  const ordersWithDateFormatted = (orders) => {
    return orders.map(order => ({
      ...order,
      deliveredDate: moment(order.deliveredDate).format(USA_DATE_FORMAT),
      price: formatCurrency(order.price),
    }))
  }

  const onMouseEnter = () => {
    setIsMouseHover(true)
  }

  const onMouseLeave = () => {
    setIsMouseHover(false)
  }

  const generatePDF = useReactToPrint({
    content: () => invoicePDF.current,
    documentTitle: `invoice_${invoice.number}_${client.name}`,
  })

  return (
    <>
      <div
        className="min-w-[816px] max-w-[816px] h-[1056px] my-10 mx-auto border border-current shadow-[3px_3px_3px_0px_rgba(0,0,0,0.75)] relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {
          isMouseHover && 
            <div
              className="absolute w-full h-[60px] text-center bg-[#00000094] flex justify-end items-center z-10"
            >
              <div
                className="text-white mr-5 hover:cursor-pointer"
                onClick={generatePDF}
              >
                <FontAwesomeIcon icon={faFileArrowDown} />
                <p className="text-xs">Download</p>
              </div>
            </div>
        }
        <div
          ref={invoicePDF}
          className="p-[50px] pt-[60px] flex flex-col h-full w-full relative"
        >
          <div className="absolute top-[20px] right-[360px]">
            <img
              className="h-[50px] w-auto"
              src="https://crisjon.com/img/Nav/L1%20with%20nb3.png"
            />
          </div>
          <div className="mt-[10px] mb-[30px]">
            <h3 className="text-xl mb-2">CRISJON FINE JEWELRY INC.</h3>
            <div className="flex justify-between text-sm">
              <div>
                <p>5 South Wabash Avenue - Suite 1312</p>
                <p>Chicago, Illinois, 60603</p>
                <p>Phone: +1(312)7959303 - +1(312)7950018</p>
                <p>Email: crisjon3d@yahoo.com</p>
              </div>
              <div className="text-end">
                <p className="font-medium underline">INVOICE {invoice.number} INFO.</p>
                <p>Billing Date: {moment().format(USA_DATE_FORMAT)}</p>
                <p>Previous Balance: {formatCurrency(client?.outstandingBalance)}</p>
                <p><span className="font-medium">Total Due: </span>{formatCurrency(invoice?.totalPrice)}</p>
              </div>
            </div>
          </div>
          <div className="mb-[30px]">
            <h3 className="text-xl mb-2">{invoice.clientName}</h3>
            <div className="text-sm">
              <p>{client?.address}</p>
              <p>{client?.city} - {client?.zipCode || 'NOT INFO'}</p>
              {/* - IBT {client?.ibt || 'NOT INFO'} */}
              <p>FEIN {client?.fein || 'NOT INFO'}</p>
              <p>STATE SALES TAX: {client?.sst || 'NOT INFO'}</p>
            </div>
          </div>
          <div className="mb-[50px]">
            <h3 className="text-xl mb-2">Orders</h3>
            <div className="w-full">
              <Table
                thList={thList}
                tdList={ordersWithDateFormatted(invoice.ordersPayed)}
                route='order'
                rowsToShow={rowsToShow}
                showInput={false}
                showTrash={false}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>___________________________________</p>
              <p>Crisjon</p>
              <p>https://www.crisjon.com</p>
            </div>
            <div>
              <p>___________________________________</p>
              <p>Client: {client.name}</p>
              <p>Phone: {client.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full flex justify-around pt-0 pb-[20px]"
      >
        <button
          onClick={generatePDF}
          className="w-[200px] rounded-md border border-inherit bg-blue-700 focus:ring-blue-500 hover:bg-blue-800 py-2 px-4 text-sm font-medium text-white"
        >
          <FontAwesomeIcon icon={faDownload} />
          <span className="ml-2">Download order</span>
        </button>
      </div>
    </>
  )
}
