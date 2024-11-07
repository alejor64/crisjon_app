import moment from "moment"
import { Table } from "../../components/Table"
import { USA_DATE_FORMAT } from "../../../utils/constants"
import { formatCurrency } from "../../../utils/functions"

const thList = ['Invoice', 'Client', 'Start Date', 'End Date', 'Total Price', 'Created Date', 'Paid']
const rowsToShow = ['id', 'clientName', 'startDate', 'endDate', 'totalPrice', 'createdAt', 'payed']

const InvoicesList = ({invoices}) => {

  invoices = invoices.map(invoice => ({
    ...invoice,
    number: `${invoice.number}`,
    id: invoice.id,
    totalPrice: formatCurrency(invoice.totalPrice),
    payed: invoice.payed ? 'Yes' : 'No',
    startDate: moment(invoice.startDate).format(USA_DATE_FORMAT),
    endDate: moment(invoice.endDate).format(USA_DATE_FORMAT),
    createdAt: moment(invoice.createdAt).format(USA_DATE_FORMAT),
  }))

  return (
    <>
      {
        invoices.length > 0 &&
          <Table
            thList={thList}
            tdList={invoices}
            route='invoice'
            rowsToShow={rowsToShow}
            showId={true}
          />
      }
    </>
  )
}

export default InvoicesList