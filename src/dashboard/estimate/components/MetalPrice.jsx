
export const MetalPrice = ({metal, rate}) => {
  const price = parseFloat(1 / rate).toFixed(2);
  return (
    <div className="flex">
      <p className="font-semibold">{metal}:</p>
      <p className="font-semibold ml-1">
        ${price} <span className="font-light italic">per</span> Ounce Troy
      </p>
    </div>
  )
}
