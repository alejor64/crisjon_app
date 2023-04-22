import { useState } from "react"
import { searchValue } from "../../../utils/functions"
import { InputFilter } from "./InputFilter"
import { ThTable, TrTable } from "./index"
import { useEffect } from "react"
import { ROW_TO_TABLE } from "../../../utils/constants"

export const Table = ({thList, tdList, route, rowsToShow, showInput = true, showTrash = true, showAllRows = true}) => {
  const [rowsInTable, setRowsInTable] = useState([])
  const sliceArray = showAllRows ? rowsInTable.length : ROW_TO_TABLE

  useEffect(() => {
    setRowsInTable(tdList)
  }, [tdList])
  
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
      {
        showInput &&
        <div className="flex justify-center">
          <InputFilter route={route} onKeyUp={onKeyUp} />
        </div>
      }
      <div className="overflow-x-auto">
        <div className="container min-w-full">
          <table className="min-w-full border-2">
            <thead className="bg-white border-b">
              <tr>
                {
                  thList.map( th => (
                    <ThTable text={th} key={th} />
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                rowsInTable.slice(0, sliceArray).map((td, idx) => (
                  <TrTable
                    key={td._id}
                    row={td}
                    odd={!(idx % 2)}
                    route={route}
                    rowsToShow={rowsToShow}
                    showTrash={showTrash}
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
