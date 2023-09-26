import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DashboardLayout } from '../../layout';
import { CLIENTS_BOOK } from '../../../utils/constants';
import { getClientBookById, updateClientBook } from '../../../api/clients_book';
import { difference, prepareDatePropertyInObject, updateValueInSS } from '../../../utils/functions';
import { ClientBookForm } from '../components/ClientBookForm';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

export const EditClientBookPage = () => {
  const formRef = useRef()
  const navigate = useNavigate()
  const { clientId } = useParams()
  const [clientInfo, setClientInfo] = useState({})

  useEffect(() => {
    getClientBookById(clientId)
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
      const { msn, client } = await updateClientBook(clientId, formData)
      client.createdAt = prepareDatePropertyInObject(client, 'createdAt')
      client.lastModificatedAt = prepareDatePropertyInObject(client, 'lastModificatedAt')
      updateValueInSS(CLIENTS_BOOK, client)
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
          ?  <ClientBookForm
                title="Edit client book"
                buttonText="Edit client"
                buttonIcon={faPenToSquare}
                client={clientInfo}
                onSubmit={onSubmit}
                ref={formRef}
              />
          : <p>Loading...</p>
        }
      </div>
    </DashboardLayout>
  )
};