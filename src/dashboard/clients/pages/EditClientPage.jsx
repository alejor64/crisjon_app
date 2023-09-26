import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { DashboardLayout } from '../../layout'
import { ClientForm } from '../components'
import { getClientById, updateClient } from '../../../api/clients'
import { difference, prepareDatePropertyInObject, updateValueInSS } from '../../../utils/functions'
import { CLIENTS } from '../../../utils/constants'

export const EditClientPage = () => {
  const formRef = useRef()
  const navigate = useNavigate()
  const { clientId } = useParams()
  const [clientInfo, setClientInfo] = useState({})

  useEffect(() => {
    getClientById(clientId)
      .then(({client}) => setClientInfo(client))
  }, [clientId])

  const onClick = () => {
    navigate(-1)
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    const formData = formRef.current.getFormState()
    const { _id, __v, ...rest } = clientInfo
    const differenceObjs = difference(formData, rest)
    if(differenceObjs){
      const { msn, client } = await updateClient(clientId, formData)
      client.createdAt = prepareDatePropertyInObject(client, 'createdAt')
      client.lastModificatedAt = prepareDatePropertyInObject(client, 'lastModificatedAt')
      updateValueInSS(CLIENTS, client)
      Swal.fire({
        title: 'Success!',
        text: msn,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
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
            Go to clients list
          </p>
        </div>
        {
          clientInfo._id 
        ?  <ClientForm
              title="Edit client"
              buttonText="Edit client"
              buttonIcon={faPenToSquare}
              orderbyClient={true}
              client={clientInfo}
              onSubmit={onSubmit}
              ref={formRef}
            />
          : <p>Loading...</p>
        }
      </div>
    </DashboardLayout>
  )
}
