import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllClients } from '../../../api/clients'
import { CLIENTS } from '../../../utils/constants'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"

export const ClientPage = () => {
  const thList = ['Name', 'Address', 'City', 'Phone', 'Created Date']
  const rowsToShow = ['id', 'name', 'address', 'city', 'phone', 'createdAt']
  const [clients, setClients] = useState([])

  useEffect(() => {
    const clientsInLS = JSON.parse(sessionStorage.getItem(CLIENTS))
    if(clientsInLS){
      setClients(clientsInLS)
    }else{
      getAllClients()
        .then(response => setClients(response.clients))
    }
  }, [])
  

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-3xl text-center my-2">
            CLIENTS
          </h2>
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                clients.length
                ? <Table thList={thList} tdList={clients} route="client" rowsToShow={rowsToShow} />
                : <NotItemsFound text="clients" />
              }
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex justify-around sm:px-6">
          <Link
            className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
            to="/client/new"
          >
            Add new client
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
