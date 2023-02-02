import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Label } from "../../../components/form"

const ThTable = ({text}) => {
  return (
    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
      {text}
    </th>
  )
}

const TdTable = ({text}) => {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer">
      {text}
    </td>
  )
}

const TrTable = ({row, odd, route, rowsToShow}) => {
  const rowObj = {
    id: row.id,
    name: row.name,
    address: row.address,
    city: row.city,
    phone: row.phone,
  }
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/${route}/edit/${row.id}`)
  }

  return (
    <tr className={`${odd ? "bg-gray-100" : "bg-white"} border-b hover:bg-gray-300`} onClick={onClick} >
      {
        rowsToShow.map(key => (
          key !== 'id' && (
            <TdTable
              text={row[key]}
              key={`${key}-${row.id}`}
            />
          )
        ))
      }
    </tr>
  )
}

const propertySearch = (property, property_value) => {
  
  if(typeof property === 'string') {
    return property.toLowerCase().includes(property_value)
  }else if(typeof property === 'number') {
    return toString(property).toLowerCase().includes(property_value)
  }
}

export const Table = ({thList, tdList, route, rowsToShow}) => {
  const [rowsInTable, setRowsInTable] = useState([])
  const routeCapitalized = route.charAt(0).toUpperCase() + route.slice(1);

  useEffect(() => {
    setRowsInTable(tdList)
  }, [tdList])
  

  const searchValue = (property_value, array) => {
    let new_array = [];
    array.map(obj => {
      Object.keys(obj).map(key => {
        const includeProperty = propertySearch(obj[key], property_value.toLowerCase())
        if(includeProperty){
          const valueInArray = new_array.find(property => property.id === obj.id)
          if(!valueInArray){
            return new_array.push(obj)
          }
        }
      })
    })
    return new_array;
  };
  
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
        <div className="p-4 flex items-center md:w-2/3 sm:w-full">
          <Label text={`${routeCapitalized} info`} htmlFor="searchClient" css="w-[100px] text-[18px]" />
          <Input
            type="text"
            name="searchClient"
            id="searchClient"
            placeholder="name, phone, address"
            autoComplete='off'
            css="ml-2"
            onKeyUp={onKeyUp}
          />
        </div>
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
                  <TrTable key={td.id} row={td} odd={!(idx % 2)} route={route} rowsToShow={rowsToShow} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
