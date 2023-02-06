import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faDownload } from "@fortawesome/free-solid-svg-icons"

import { tdList as clients } from "../../../clients/pages/clients";
import { CLIENTS } from "../../../../utils/constants";

export const OrderPDF = ({orderInfo}) => {
  const orderPDF = useRef()
  const [isMouseHover, setIsMouseHover] = useState(false)

  const clientsInSS = JSON.parse(sessionStorage.getItem(CLIENTS))
  const client = clientsInSS.find(client => client.name === orderInfo.clientName)
  console.log('orderInfo', orderInfo)

  const generatePDF = useReactToPrint({
    content: () => orderPDF.current,
    documentTitle: `order_${client.name}_${orderInfo.name.replace(' ', '-')}`,
  })

  const onMouseEnter = () => {
    setIsMouseHover(true)
  }

  const onMouseLeave = () => {
    setIsMouseHover(false)
  }

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
          ref={orderPDF}
          className="p-[80px] flex flex-col h-full w-full relative"
        >
          <div className="absolute top-[20px] right-[350px]">
            <img
              className="h-[60px] w-auto"
              src="https://crisjon.com/img/Nav/L1%20with%20nb3.png"
            />
          </div>
          <div className="mt-[20px] mb-[60px]">
            <h3 className="text-3xl mb-3">Crisjon</h3>
            <div className="flex justify-between">
              <div>
                <p>5 South Wabash Avenue - Suite 1312</p>
                <p>Chicago, Illinois, 60603</p>
                <p>Phone: +1(312)7959303 - +1(312)7950018</p>
              </div>
              <div className="text-end">
                <p>Order info</p>
                <p>Date: {new Date().toDateString()}</p>
                <p>ID: {orderInfo.jobId}</p>
              </div>
            </div>
          </div>
          <div className="mb-[90px]">
            <h3 className="text-3xl mb-3">{client.name}</h3>
            <div>
              <p>{client.address}</p>
              <p>{`${client.city}, ${client.state}, ${client.zipCode}`}</p>
              <p>Phone: {client.phone}</p>
            </div>
          </div>
          <div className="mb-[170px]">
            <h3 className="text-3xl mb-3">Order</h3>
            <div className="flex justify-between">
              <div className="w-1/2">
                <div>
                  <strong>Job Name:</strong> {orderInfo?.name}
                </div>
                <div>
                  <strong>CAD Number:</strong> {orderInfo?.cadNumber}
                </div>
                <div>
                  <strong>Service: </strong> {orderInfo?.service}
                </div>
                <div>
                  <strong>Item:</strong> {orderInfo?.item}
                </div>
                <div>
                  <strong>Rush:</strong> {orderInfo?.rush ? "Yes" : "No"}
                </div>
              </div>
              <div className="w-1/2 pl-[30px]">
                <div>
                  <strong>Payment date:</strong> {orderInfo?.paymentDate}
                </div>
                <div>
                  <strong>Price:</strong> {orderInfo?.price}
                </div>
                <div>
                  <strong>Payment type: </strong> {orderInfo?.paymentType}
                </div>
                {
                  orderInfo?.paymentType === 'check' &&
                    <div>
                      <strong>Check number:</strong> {orderInfo?.checkNumber}
                    </div>
                }
                <div>
                  <strong>Delivered date:</strong> {orderInfo?.deliveredDate}
                </div>
              </div>
            </div>
            <div>
              <strong>Description:</strong> {orderInfo?.description}
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
