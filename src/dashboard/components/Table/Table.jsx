import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchValue } from "../../../utils/functions"
import { InputFilter } from "./InputFilter"
import { ThTable, TrTable } from "./index"

export const Table = ({thList, tdList, route, rowsToShow}) => {
  const [rowsInTable, setRowsInTable] = useState(tdList)
  const navigate = useNavigate()

  const onClick = (row) => {
    navigate(`/${route}/edit/${row._id}`)
  }
  
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
                    <ThTable text={th} key={th} />
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
                    onClick={() => onClick(td)}
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
