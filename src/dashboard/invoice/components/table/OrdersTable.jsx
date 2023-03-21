import { useState } from "react";
import { searchValue } from "../../../../utils/functions";
import { ThTable, TrTable } from "../../../components/Table";
import { InputFilter } from "../../../components/Table/InputFilter";

export const OrdersTable = ({thList, tdList, route, rowsToShow, setOrdersChecked, ordersChecked}) => {
  const [rowsInTable, setRowsInTable] = useState(tdList)

  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      if(e.target.value){
        setRowsInTable(searchValue(e.target.value, tdList));
      }else {
        setRowsInTable(tdList)
      }
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <InputFilter route={route} onKeyUp={onKeyUp} />
      </div>
      <div className="overflow-x-auto">
        <div className="container p-4 min-w-full">
          <table className="min-w-full border-2">
            <thead className="bg-white border-b">
              <tr>
                {
                  thList.map( th => (
                    <ThTable
                      text={th}
                      key={th}
                      css="flex items-center"
                      setOrdersChecked={setOrdersChecked}
                      rowsInTable={rowsInTable}
                      ordersChecked={ordersChecked}
                    />
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                rowsInTable.map((td, idx) => (
                  <TrTable
                    key={td._id}
                    row={td}
                    odd={!(idx % 2)}
                    route={route}
                    rowsToShow={rowsToShow}
                    withCheckbox={true}
                    setOrdersChecked={setOrdersChecked}
                    ordersChecked={ordersChecked}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
