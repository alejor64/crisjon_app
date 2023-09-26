import {useRef } from 'react'
import { Link } from 'react-router-dom'
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { ClientForm } from '../components'
import { createClient } from '../../../api/clients'
import { DashboardLayout } from '../../layout'
import { addValueToSS, prepareDatePropertyInObject } from '../../../utils/functions'
import { CLIENTS } from '../../../utils/constants'

export const NewClientPage = () => {
  const formRef = useRef()

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = formRef.current.getFormState()
    const {msn, client} = await createClient(formData)
    client.createdAt = prepareDatePropertyInObject(client, 'createdAt')
    addValueToSS(CLIENTS, client)
    Swal.fire({
      title: 'Success!',
      text: msn,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
  }
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
          onSubmit={onSubmit}
          ref={formRef}
        />
      </div>
    </DashboardLayout>
  )
}
