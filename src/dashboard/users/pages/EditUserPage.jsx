import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Swal from 'sweetalert2'
import { getUserById, updateUser } from "../../../api/users"
import { DashboardLayout } from "../../layout"
import { UserForm } from "../components/UserForm"
import { difference } from "../../../utils/functions"
import { USERS } from "../../../utils/constants"

import { tdList } from "./users"

export const EditUserPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const formRef = useRef()

  useEffect(() => {
    getUserById(userId)
      .then(response => setUser(response))
  }, [])

  const onClick = () => {
    navigate(-1)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = formRef.current.getFormState()
    const {lastModificatedAt, token, createdAt, ...rest} = user
    const differenceObjs = difference(formData, rest)
    if(differenceObjs){
      const { user } = await updateUser(userId, formData)
      sessionStorage.removeItem(USERS)
      Swal.fire({
        title: 'Success!',
        text: `The ${formData.email} has been updated.`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => navigate(-1))
    }
  }

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
        {
          user.email &&
            <UserForm
              title="Edit user"
              buttonText="Edit user"
              buttonIcon={faUser}
              user={user}
              onSubmit={onSubmit}
              ref={formRef}
            />
        }
      </div>
    </DashboardLayout>
  )
}
