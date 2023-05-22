import { Tooltip } from 'react-tooltip'

export const MetalPrice = ({metal, rate, onClick, todayRatePrice = 0}) => {
  const price = parseFloat(1 / rate).toFixed(2);
  const todayMetalPrice = parseFloat(1 / todayRatePrice).toFixed(2);
  return (
    <div className="flex">
      <p className="font-semibold">{metal}:</p>
      <p className="font-semibold ml-1">
        ${price} <span className="font-light italic">per</span> Ounce Troy
      </p>
      {
        todayRatePrice > 0 &&
        <>
          <span
            className="ml-1 text-blue-700 cursor-pointer"
            data-tooltip-id="metal-price-tooltip"
            data-tooltip-content={`Today ${metal} price is $${todayMetalPrice} USD`}
            onClick={onClick}
          >
            Update price
          </span>
          <Tooltip
            id="metal-price-tooltip"
            place="right"
            style={{ backgroundColor: "#fadc0b", color: "#000" }}
          />
        </>
      }
    </div>
  )
}
