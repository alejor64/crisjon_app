import React, { useRef } from 'react';
import { DashboardLayout } from '../../layout';
import { ClientBookForm } from '../components/ClientBookForm';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { CLIENTS_BOOK } from '../../../utils/constants';
import { addValueToSS, prepareDatePropertyInObject } from '../../../utils/functions';
import { createClientBook } from '../../../api/clients_book';
import { Link } from 'react-router-dom';

export const NewClientBookPage = () => {
  const formRef = useRef()

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = formRef.current.getFormState()
    const {msn, client} = await createClientBook(formData)
    client.createdAt = prepareDatePropertyInObject(client, 'createdAt')
    addValueToSS(CLIENTS_BOOK, client)
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
        <ClientBookForm
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