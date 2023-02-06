import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { DashboardLayout } from '../../layout'
import { UserForm } from '../components/UserForm'
import { createUser } from '../../../api/users'
import { addValueToSS, prepareDatePropertyInObject } from '../../../utils/functions'
import { USERS } from '../../../utils/constants'

export const NewUserPage = () => {
  const formRef = useRef()
  const navigate = useNavigate()

  const onSubmit = async(e) => {
    e.preventDefault()
    const formData = formRef.current.getFormState()
    const { msn, user } = await createUser(formData)
    user.createdAt = prepareDatePropertyInObject(user, 'createdAt')
    addValueToSS(USERS, user)
    Swal.fire({
      title: 'Success!',
      text: msn,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then((result) => navigate(-1))
  }
  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container mx-auto max-w-7xl px-2 mt-2'>
          <Link
            to="user/list"
            className='underline text-blue-700'
          >
            Go to users list
          </Link>
        </div>
        <UserForm
          title="Add new user"
          buttonText="Save new User"
          buttonIcon={faUser}
          createNew={true}
          ref={formRef}
          onSubmit={onSubmit}
        />
      </div>
    </DashboardLayout>
  )
}
