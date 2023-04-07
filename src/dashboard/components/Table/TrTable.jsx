import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { TdTable, TdTableInvoice } from "./index"
import { useDeleteData } from "../../../hooks/useDeleteData"

export const TrTable = ({row, odd, rowsToShow, withCheckbox = false, setOrdersChecked, ordersChecked, route, showTrash}) => {
  const navigate = useNavigate()

  const onClick = (row) => {
    navigate(`/${route}/edit/${row._id}`)
  }

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Warning!',
      text: `Are you sure you want to delete the ${route} ${row.name || row.number}?`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonColor: "#1F2937",
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: 'No, cancel!',
    }).then(({isConfirmed}) => {
      if(isConfirmed) useDeleteData(route, row._id)
    })
  }

  return (
    <tr className={`${odd ? "bg-gray-100" : "bg-white"} border-b hover:bg-gray-300`}>
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
              onClick={() => onClick(row)} 
            />
          )
        ))
      }
      {
        showTrash &&
          <td
            className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center`}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="min-h-[25px] text-red-500 cursor-pointer"
              onClick={() => handleDelete(row)}
            />
          </td>
      }
    </tr>
  )
}
