import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllClients } from '../../../api/clients'
import { CLIENTS } from '../../../utils/constants'
import { DashboardLayout } from "../../layout"
import { DataGridCustom } from '../../components/Table/DataGridCustom'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { useDeleteData } from '../../../hooks/useDeleteData'

export const ClientPage = () => {
  const [clientsRows, setClientsRows] = useState([])

  useEffect(() => {
    const clientsInLS = JSON.parse(sessionStorage.getItem(CLIENTS))
    if(clientsInLS){
      const clients = clientsInLS.map(client => ({
        ...client,
        id: client._id
      }))
      setClientsRows(clients)
    }else{
      getAllClients()
        .then(response => {
          const clients = response.clients.map(client => ({
            ...client,
            id: client._id
          }))
          setClientsRows(clients)
        }
      )
    }
  }, [])

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Warning!',
      text: `Are you sure you want to delete the client ${row.name || row.number}?`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonColor: "#1F2937",
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: 'No, cancel!',
    }).then(({isConfirmed}) => {
      if(isConfirmed) useDeleteData("client", row._id)
    })
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="min-h-[25px] text-red-500 cursor-pointer"
          onClick={() => handleDelete(params.row)}
        />
      ),
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-3xl text-center my-2">
            CLIENTS
          </h2>
          <div className="py-2 flex justify-around sm:px-6">
            <Link
              className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
              to="/client/new"
            >
              Add new client
            </Link>
          </div>
          {
            clientsRows.length ?
              <DataGridCustom
                columns={columns}
                rows={clientsRows}
                filterKeys={columns.map(column => column.field)}
                sortProperty="name"
                route="client"
              />
            :
              <NotItemsFound text="clients" />
          }
        </div>
      </div>
    </DashboardLayout>
  )
}
