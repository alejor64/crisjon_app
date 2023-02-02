import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { ClientForm } from '../components'
import { DashboardLayout } from '../../layout'
import { Link } from 'react-router-dom'

export const NewClientPage = () => {
  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container mx-auto max-w-7xl px-2 mt-2'>
          <Link
            to="client/list"
            className='underline text-blue-700'
          >
            Go to clients list
          </Link>
        </div>
        <ClientForm
          title="Add new client"
          buttonText="Save new client"
          buttonIcon={faFloppyDisk}
        />
      </div>
    </DashboardLayout>
  )
}
