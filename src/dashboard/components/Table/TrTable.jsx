import { TdTable, TdTableInvoice } from "./index"

export const TrTable = ({row, odd, rowsToShow, onClick, withCheckbox = false, setOrdersChecked, ordersChecked}) => {
  
  return (
    <tr className={`${odd ? "bg-gray-100" : "bg-white"} border-b hover:bg-gray-300`} onClick={onClick} >
      {
        withCheckbox &&
          <TdTableInvoice row={row} setOrdersChecked={setOrdersChecked} ordersChecked={ordersChecked} />
      }
      {
        rowsToShow.map(key => (
          key !== 'id' && (
            <TdTable
              text={row[key]}
              key={`${key}-${row.id}`}
              css={!withCheckbox ? 'cursor-pointer' : ''}
            />
          )
        ))
      }
    </tr>
  )
}
