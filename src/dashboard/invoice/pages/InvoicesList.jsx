import moment from "moment"
import { Table } from "../../components/Table"
import { USA_DATE_FORMAT } from "../../../utils/constants"
import { formatCurrency } from "../../../utils/functions"

const thList = ['Invoice', 'Client', 'Start Date', 'End Date', 'Total Price', 'Payed']
const rowsToShow = ['id', 'number', 'clientName', 'startDate', 'endDate', 'totalPrice', 'payed']

const InvoicesList = ({invoices}) => {

  invoices = invoices.map(invoice => ({
    ...invoice,
    number: `${invoice.number}`,
    totalPrice: formatCurrency(invoice.totalPrice),
    payed: invoice.payed ? 'Yes' : 'No',
    startDate: moment(invoice.startDate).format(USA_DATE_FORMAT),
    endDate: moment(invoice.endDate).format(USA_DATE_FORMAT)
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
          />
      }
    </>
  )
}

export default InvoicesList