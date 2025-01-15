import moment from "moment"
import { USA_DATE_FORMAT } from "../../../utils/constants"
import { formatCurrency } from "../../../utils/functions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { DataGridCustom } from "../../components/Table/DataGridCustom"
import Swal from "sweetalert2"
import { useDeleteData } from "../../../hooks/useDeleteData"

const InvoicesList = ({invoices}) => {

  invoices = invoices.map(invoice => ({
    ...invoice,
    number: `${invoice.number}`,
    id: invoice._id,
    idCol: invoice.id,
    totalPrice: formatCurrency(invoice.totalPrice),
    outstandingBalance: formatCurrency(invoice.outstandingBalance),
    payed: invoice.payed ? 'Yes' : 'No',
    startDate: moment(invoice.startDate).format(USA_DATE_FORMAT),
    endDate: moment(invoice.endDate).format(USA_DATE_FORMAT),
    createdAt: moment(invoice.createdAt).format(USA_DATE_FORMAT),
  }))

  const handleDelete = (row) => {
      Swal.fire({
        title: 'Warning!',
        text: `Are you sure you want to delete the invoice ${row.number || row.id}?`,
        icon: "warning",
        showConfirmButton: true,
        confirmButtonColor: "#1F2937",
        showDenyButton: true,
        confirmButtonText: 'Yes, delete it!',
        denyButtonText: 'No, cancel!',
      }).then(({isConfirmed}) => {
        if(isConfirmed) useDeleteData("invoice", row._id)
      })
    }

  const columns = [
    {
      field: 'idCol',
      headerName: 'Invoice',
    },
    {
      field: 'clientName',
      headerName: 'Client',
      flex: 1
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      flex: 1
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      flex: 1
    },
    {
      field: 'payed',
      headerName: 'Paid',
    },
    {
      field: 'outstandingBalance',
      headerName: 'Out Standing Balance',
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
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(params.row);
          }}
        />
      ),
    }
  ];

  return (
    <>
      {
        invoices.length > 0 &&
          <DataGridCustom
            columns={columns}
            rows={invoices}
            filterKeys={columns.map(column => column.field)}
            sortProperty="id"
            route="invoice"
          />
      }
    </>
  )
}

export default InvoicesList