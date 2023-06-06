import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { ESTIMATED_PRICES } from "../../../../utils/constants"
import { formatCurrency } from "../../../../utils/functions"

const TrTableOnlyPrice = ({item, estimate}) =>  (
  <tr className="text-center">
    <td className="border-t">{item}</td>
    <td className="border-t">{formatCurrency(estimate[`${item.toLowerCase()}Price`])}</td>
    <td className="border-t"> - </td>
    <td className="border-t">{formatCurrency(estimate[`${item.toLowerCase()}Price`])}</td>
  </tr>
)

const TrTable = ({item, estimate}) => (
  <tr className="text-center">
    <td className="border-t">{item}</td>
    <td className="border-t">{formatCurrency(estimate[`${item.toLowerCase()}Price`])}</td>
    <td className="border-t">{estimate[`${item.toLowerCase()}Quantity`]}</td>
    <td className="border-t">{formatCurrency(estimate[`${item.toLowerCase()}Price`] * estimate[`${item.toLowerCase()}Quantity`])}</td>
  </tr>
)

export const EstimatePdf = ({estimateId}) => {
  const estimateInSS = JSON.parse(sessionStorage.getItem(ESTIMATED_PRICES))
  const estimate = estimateInSS.find(client => client._id === estimateId)
  const estimatePDF = useRef()
  const goldPrice = parseFloat(1 / estimate.goldenPrice).toFixed(2)

  const generatePDF = useReactToPrint({
    content: () => estimatePDF.current,
    documentTitle: `estimate_${estimate.clientName}_${estimate.name.replace(' ', '-')}`,
  })

  return (
    <>
      <div
        className="min-w-[816px] max-w-[816px] h-[1056px] my-10 mx-auto border border-current shadow-[3px_3px_3px_0px_rgba(0,0,0,0.75)] relative"
      >
        <div
          ref={estimatePDF}
          className="p-[50px] pt-[70px] flex flex-col h-full w-full relative"
        >
          <div className="absolute top-[20px] right-[360px]">
            <img
              className="h-[50px] w-auto"
              src="https://crisjon.com/img/Nav/L1%20with%20nb3.png"
            />
          </div>
          <div className="mt-[10px] mb-[50px]">
            <h3 className="text-xl mb-2">Crisjon</h3>
            <div className="flex justify-between text-sm">
              <div>
                <p>5 South Wabash Avenue - Suite 1312</p>
                <p>Chicago, Illinois, 60603</p>
                <p>Phone: +1(312)7959303 - +1(312)7950018</p>
              </div>
              <div className="text-end text-sm">
                <p>Estimate info</p>
                <p>Name: {estimate.name}</p>
              </div>
            </div>
          </div>
          <div className="mb-[50px]">
            <h3 className="text-xl mb-2 text-center">Estimated price</h3>
            <div className="flex mb-1 w-[98%]">
              <table className="w-full border-y border-black">
                <thead>
                  <tr>
                    <th className="border-b border-black">Item</th>
                    <th className="border-b border-black">Price per each</th>
                    <th className="border-b border-black">Quantity</th>
                    <th className="border-b border-black">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <TrTableOnlyPrice item='Cad' estimate={estimate} />
                  <TrTable item='Wax' estimate={estimate} />
                  <TrTable item='Casting' estimate={estimate} />
                  <tr className="text-center">
                    <td className="border-t">Metal {estimate.metalType}</td>
                    <td className="border-t">{formatCurrency(estimate.metalPrice)}</td>
                    <td className="border-t">{estimate.metalQuantity}</td>
                    <td className="border-t">{formatCurrency(estimate.metalPrice * estimate.metalQuantity)}</td>
                  </tr>
                  <TrTable item='Stone' estimate={estimate} />
                  <tr className="text-center">
                    <td className="border-t">Center Stone</td>
                    <td className="border-t">{formatCurrency(estimate.centerStonePrice)}</td>
                    <td className="border-t"> - </td>
                    <td className="border-t">{formatCurrency(estimate.centerStonePrice)}</td>
                  </tr>
                  <TrTable item='Cleaning' estimate={estimate} />
                  <TrTable item='Diamond' estimate={estimate} />
                  <tr className="text-center">
                    <td className="border-t">Color Stone</td>
                    <td className="border-t">{formatCurrency(estimate.colorStone)}</td>
                    <td className="border-t"> - </td>
                    <td className="border-t">{formatCurrency(estimate.colorStone)}</td>
                  </tr>
                  <TrTable item='Polishing' estimate={estimate} />
                  <TrTable item='Assembling' estimate={estimate} />
                  <TrTable item='Findings' estimate={estimate} />
                  <TrTable item='Rhodioum' estimate={estimate} />
                  <TrTable item='Engraving' estimate={estimate} />
                  <TrTable item='Picture' estimate={estimate} />
                  <tr className="text-center">
                    <td className="border-t">-</td>
                    <td className="border-t">-</td>
                    <td className="border-t">-</td>
                    <td className="border-t">-</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-t font-semibold">TOTAL</td>
                    <td className="border-t">-</td>
                    <td className="border-t">-</td>
                    <td className="border-t font-semibold">{formatCurrency(estimate.totalPrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex mt-[80px] justify-between">
            <div className="text-sm">
              <p>___________________________________</p>
              <p>Crisjon</p>
              <p>https://www.crisjon.com</p>
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
          <span className="ml-2">Download estimate</span>
        </button>
      </div>
    </>
  )
}
