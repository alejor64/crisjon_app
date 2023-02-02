import { useNavigate, useParams } from 'react-router-dom'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { DashboardLayout } from '../../layout'
import { ClientForm } from '../components'

import { tdList } from "./clients"

export const EditClientPage = () => {
  const { clientId } = useParams()

  const client = tdList.find(client => client.id === clientId)

  const navigate = useNavigate()

  const onClick = () => {
    navigate(-1)
  }

  return (
    <DashboardLayout>
      <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='container mx-auto max-w-7xl px-2 mt-2'>
          <p
            onClick={onClick}
            className='underline text-blue-700 cursor-pointer'
          >
            Go to clients list
          </p>
        </div>
        <ClientForm
          title="Edit client"
          buttonText="Edit client"
          buttonIcon={faPenToSquare}
          orderbyClient={true}
          client={client}
        />
      </div>
    </DashboardLayout>
  )
}
