import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material'
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
import { calculateMUITotal } from '../helpers/common';
import { METAL_TYPES } from '../helpers/constants';

const prepareEstimatedPrices = (estimatePrices) => {
  return estimatePrices.map(ep => ({
      ...ep,
      goldenPrice: formatCurrency(parseFloat(1 / ep.goldenPrice).toFixed(2)),
      totalPrice: formatCurrency(ep.totalPrice),
      id: ep._id,
    }
  ))
}

const metalOptions = ["10K", "14K", "18K", "Silver", "Platinum"];

export const EstimatePage = () => {
  const estimatedPricesInSS = JSON.parse(sessionStorage.getItem(ESTIMATED_PRICES) || '[]');
  const [estimatePrices, setEstimatePrices] = useState(prepareEstimatedPrices(estimatedPricesInSS));
  const [loading, setLoading] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState("10K");

  useEffect(() => {
    if(!estimatePrices.length) {
      setLoading(true);
      getEstimatedPrices()
        .then( response => setEstimatePrices(prepareEstimatedPrices(response.estimatedPrices)))
        .finally(() => setLoading(false));
    }
  }, [])

  useEffect(() => {
    if (selectedMetal) {
      setEstimatePrices(prev => prev.map(estimate => ({
        ...estimate,
        totalPrice: calculateMUITotal(estimate, METAL_TYPES(selectedMetal.replace("K", ""))).totalFormatted,
      })))
    } else {
      setEstimatePrices(prev => prev.map(estimate => ({
        ...estimate,
        totalPrice: calculateMUITotal(estimate).totalFormatted,
      })))
    }
  }, [selectedMetal]);

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
      headerName: `Price ${selectedMetal ?? ""}`,
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
        <EstimateFilters estimatePrices={estimatedPricesInSS} setEstimatePrices={setEstimatePrices} prepareEstimatedPrices={prepareEstimatedPrices} />
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
            <Box>
              <Autocomplete
                options={metalOptions}
                value={selectedMetal}
                onChange={(_, newValue) => setSelectedMetal(newValue)}
                sx={{ width: 250, margin: "0 auto", marginBottom: 2 }}
                renderInput={(params) => <TextField {...params} label="Metal Price to show" size="small" />}
              />
            </Box>
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
