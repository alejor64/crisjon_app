import { faUser } from "@fortawesome/free-regular-svg-icons"
import { useNavigate, useParams } from "react-router-dom"
import { DashboardLayout } from "../../layout"
import { UserForm } from "../components/UserForm"

import { tdList } from "./users"

export const EditUserPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const onClick = () => {
    navigate(-1)
  }

  const user = tdList.find(user => user.id === userId)

  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container mx-auto max-w-7xl px-2 mt-2'>
          <p
            onClick={onClick}
            className='underline text-blue-700 cursor-pointer'
          >
            Go to users list
          </p>
        </div>
        <UserForm
          title="Edit user"
          buttonText="Edit user"
          buttonIcon={faUser}
          user={user}
        />
      </div>
    </DashboardLayout>
  )
}
