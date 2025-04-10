import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from "../../layout"
import { ESTIMATED_PRICES } from '../../../utils/constants'
import { getEstimatedPrices } from '../../../api/estimatedPrice/estimatedPrice'
import { formatCurrency } from '../../../utils/functions'
import { NotItemsFound } from '../../components/NotItemsFound/NotItemsFound'
import { EstimateFilters } from '../components/filter/EstimateFilters'
import { DataGridCustom } from '../../components/Table/DataGridCustom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { useDeleteData } from '../../../hooks/useDeleteData'
import { CircularProgress } from '@mui/material'

const prepareEstimatedPrices = (estimatePrices) => {
  return estimatePrices.map(ep => ({
      ...ep,
      goldenPrice: formatCurrency(parseFloat(1 / ep.goldenPrice).toFixed(2)),
      totalPrice: formatCurrency(ep.totalPrice),
      id: ep._id,
    }
  ))
}

export const EstimatePage = () => {
  const estimatedPricesInSS = JSON.parse(sessionStorage.getItem(ESTIMATED_PRICES) || '[]');
  const [estimatePrices, setestimatePrices] = useState(prepareEstimatedPrices(estimatedPricesInSS));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!estimatePrices.length) {
      setLoading(true);
      getEstimatedPrices()
        .then( response => setestimatePrices(prepareEstimatedPrices(response.estimatedPrices)))
        .finally(() => setLoading(false));
    }
  }, [])

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Warning!',
      text: `Are you sure you want to delete the estimate ${row.name || row.totalPrice}?`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonColor: "#1F2937",
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: 'No, cancel!',
    }).then(({isConfirmed}) => {
      if(isConfirmed) useDeleteData("estimate", row._id)
    })
  }

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Created at',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'clientName',
      headerName: 'Client Name',
      flex: 1
    },
    {
      field: 'totalPrice',
      headerName: 'Price',
      description: "Metal price no included",
      flex: 1,
    },
    {
      field: 'goldenPrice',
      headerName: 'Golden Price',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="min-h-[25px] text-red-500 cursor-pointer"
          onClick={() => handleDelete(params.row)}
        />
      ),
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h2 className="text-3xl text-center my-2">
          ESTIMATES
        </h2>
        <EstimateFilters estimatePrices={estimatedPricesInSS} setestimatePrices={setestimatePrices} prepareEstimatedPrices={prepareEstimatedPrices} />
        <div className="px-4 py-3 flex justify-around sm:px-6">
          {
            loading ?
            <CircularProgress />
            :
            <Link
              className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
              to="/estimate/new"
            >
              Make an estimate
            </Link>
          }
        </div>
        <div className="mt-2">
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                estimatePrices.length ?
                <DataGridCustom
                  columns={columns}
                  rows={estimatePrices}
                  filterKeys={columns.map(column => column.field)}
                  sortProperty="createdAt"
                  route="estimate"
                />
                : <NotItemsFound text="estimates" />
              }
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
