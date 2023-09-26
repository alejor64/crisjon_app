import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../layout';
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound';
import { CLIENTS_BOOK } from '../../../utils/constants';
import { getAllClientsBook } from '../../../api/clients_book';
import { Table } from '../../components/Table';

export const ClientBookPage = () => {
  const thList = ['Name', 'Book page', 'Phone', 'Email', 'Created Date']
  const rowsToShow = ['id', 'name', 'bookPage', 'phone', 'email', 'createdAt']
  const [clients, setClients] = useState([])

  useEffect(() => {
    const clientsInLS = JSON.parse(sessionStorage.getItem(CLIENTS_BOOK))
    if(clientsInLS){
      setClients(clientsInLS)
    }else{
      getAllClientsBook()
        .then(response => setClients(response.clients))
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-3xl text-center my-2">
            CLIENTS BOOK
          </h2>
          <div className="py-2 flex justify-around sm:px-6">
            <Link
              className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
              to="/book/new"
            >
              Add new client book
            </Link>
          </div>
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                clients.length
                ? <Table thList={thList} tdList={clients} route="client-book" rowsToShow={rowsToShow} />
                : <NotItemsFound text="clients" />
              }
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
};