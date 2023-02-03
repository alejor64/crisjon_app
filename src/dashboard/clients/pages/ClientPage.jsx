import { Link } from 'react-router-dom'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"

import { tdList } from "./clients"

const thList = ['Name', 'Address', 'City', 'Phone', 'Created Date']
const rowsToShow = ['id', 'name', 'address', 'city', 'phone', 'created_at']

export const ClientPage = () => {

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
                tdList.length
                ? <Table thList={thList} tdList={tdList} route="client" rowsToShow={rowsToShow} />
                : <h2>No hay clientes</h2>
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
