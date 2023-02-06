import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../../api/users'
import { USERS } from '../../../utils/constants'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"

import { tdList } from "./users"

const thList = ['Name', 'Email', 'Role', 'Created Date']
const rowsToShow = ['id', 'name', 'email', 'role', 'createdAt']

export const UserPage = () => {
  const usersInSS = JSON.parse(sessionStorage.getItem(USERS) || '[]')
  const [users, setUsers] = useState(usersInSS)

  useEffect(() => {
    if(!users.length){
      getUsers()
        .then(response => setUsers(response))
    }
  }, [])
  

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
                users.length > 0
                ? <Table thList={thList} tdList={users} route="user" rowsToShow={rowsToShow} />
                : <NotItemsFound text="users" />
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
