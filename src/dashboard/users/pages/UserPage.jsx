import { Link } from 'react-router-dom'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"

import { tdList } from "./users"

const thList = ['Name', 'Email', 'Role', 'Created Date']
const rowsToShow = ['id', 'name', 'email', 'role', 'created_at']

export const UserPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-3xl text-center my-2">
            USERS
          </h2>
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                tdList.length
                ? <Table thList={thList} tdList={tdList} route="user" rowsToShow={rowsToShow} />
                : <h2>Cargando usuarios</h2>
              }
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-around space-x-2">
          <Link
            className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
            to="/user/new"
          >
            Add new user
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
