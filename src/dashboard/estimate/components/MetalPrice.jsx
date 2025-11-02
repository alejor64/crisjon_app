import { Button as MUIButton } from '@mui/material';
import { Tooltip } from 'react-tooltip'

export const MetalPrice = ({metal, rate, onClick, todayRatePrice = 0}) => {
  const price = parseFloat(1 / rate).toFixed(2);
  const todayMetalPrice = parseFloat(1 / todayRatePrice).toFixed(2);

  return (
    <div className="flex">
      <>
        {todayRatePrice > 0 ? (
          <>
            <MUIButton
              className="font-semibold"
              sx={{ padding: 0, minWidth: 'auto' }}
              data-tooltip-id="metal-price-tooltip"
              data-tooltip-content={`Today ${metal} price is $${todayMetalPrice} USD`}
              variant='button'
              onClick={onClick}
            >
              {metal}:
            </MUIButton>
            <Tooltip
              id="metal-price-tooltip"
              place="left"
              style={{ backgroundColor: "#fadc0b", color: "#000" }}
            />
          </>
        ) : (
          <p className="font-semibold">
            {metal}:
          </p>
        )}
      </>
      <p className="font-semibold ml-1">
        ${price} <span className="font-light italic">per</span> Ounce Troy
      </p>
    </div>
  )
}
