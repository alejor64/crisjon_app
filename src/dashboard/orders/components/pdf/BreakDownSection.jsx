import { formatCurrency } from "../../../../utils/functions"

const TrTable = ({item}) => {
  return (
    <tr className="text-center">
      <td className="border-t">{item.quantity}</td>
      <td className="border-t">{item.service}</td>
      <td className="border-t">{formatCurrency(item.priceEach)}</td>
      <td className="border-t">{item.amount}</td>
    </tr>
  )
}

export const BreakDownSection = ({breakDown}) => {
  return (
    <>
      <div className="flex mb-3 justify-center">
        <h2 className="text-xl">Breakdown</h2>
      </div>
      <div className="flex mb-1 w-[98%]">
        <table className="w-full border-y border-black">
          <thead>
            <tr>
              <th className="border-b border-black">Quantity</th>
              <th className="border-b border-black">Item Service</th>
              <th className="border-b border-black">Price Each</th>
              <th className="border-b border-black">Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              breakDown.map((item) => {
                if(item.amount) return <TrTable item={item} key={item.service} />
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
