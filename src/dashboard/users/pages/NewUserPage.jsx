import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../layout'
import { UserForm } from '../components/UserForm'

export const NewUserPage = () => {
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
        />
      </div>
    </DashboardLayout>
  )
}
