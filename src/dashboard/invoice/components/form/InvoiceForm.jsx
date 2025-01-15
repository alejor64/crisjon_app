import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import moment from "moment"
import { faCirclePlus, faFileInvoiceDollar, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Form, InputLabelContainer } from "../../../../components/form"
import { editInvoiceById, getInvoiceById } from "../../../../api/invoice"
import { formatCurrency } from "../../../../utils/functions"
import { CLIENTS, DATA_PICKER_FORMAT, USA_DATE_FORMAT } from "../../../../utils/constants"
import { DataGridCustom } from "../../../components/Table/DataGridCustom"
import { Box, Button as ButtonMUI, Container, IconButton, MenuItem, TextField, Tooltip, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs"
import { getAllClients } from "../../../../api/clients"

const columns = [
    {
      field: 'clientName',
      headerName: 'Client Job name',
      flex: 1
    },
    {
      field: 'item',
      headerName: 'Item',
      flex: 1
    },
    {
      field: 'deliveredDate',
      headerName: 'Delivered Date',
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1
    },
  ];

export const InvoiceForm = ({title}) => {
  const { invoiceId } = useParams()
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({})
  const [payments, setPayments] = useState([])
  const [checkNumber, setCheckNumber] = useState("")
  const [outstandingBalance, setOutstandingBalance] = useState(0)
  const [invoiceIdValue, setInvoiceIdValue] = useState("")
  const [clientInfo, setClientInfo] = useState()
  const clientsOptions = JSON.parse(sessionStorage.getItem(CLIENTS) || "[]")
  const [outStandingBalanceInvoice, setOutStandingBalanceInvoice] = useState(0)
  const [ordersValues, setOrdersValues] = useState(0)
  const disabledButton = payments.some((payment) => 
    Object.values(payment).some((value) => value === null)
  );
  const isOldInvoice = invoice?.payed && !invoice?.payments?.length
  const pricePayed = payments.reduce((acc, payment) => acc + parseInt(payment.price || 0), 0)
  const orderPendingBalanceIsNegative = invoice.totalPrice - pricePayed >= 0 ? invoice.totalPrice - pricePayed : 0

  const shootSwal = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 2000
    })
  }

  useEffect(() => {
    const getInvoice = async () => {
      try {
        const {invoice: invoiceInfo} = await getInvoiceById(invoiceId)
        setInvoice({
          ...invoiceInfo,
          id: invoiceInfo?.id || invoiceInfo?.number,
        })
        setInvoiceIdValue(invoiceInfo?.id || invoiceInfo?.number)
        setPayments(invoiceInfo?.payments || [])
        setCheckNumber(invoiceInfo?.checkNumber || "")
        setOutstandingBalance(invoiceInfo?.outstandingBalance || 0)
        setOrdersValues(invoiceInfo?.ordersPayed.reduce((totalPrice, order) => totalPrice + order.price, 0))
  
        const client = clientsOptions.find(cl => cl.name === invoiceInfo?.clientName)
        if(client?.outstandingBalanceInvoice && client?.outstandingBalanceInvoice !== invoiceId) {
          const {invoice: invoiceBalance} = await getInvoiceById(client.outstandingBalanceInvoice)
          setOutStandingBalanceInvoice(invoiceBalance)
        }
        setClientInfo(client)
      } catch (error) {
        shootSwal('Error!', "Something went wrong", 'error')
      }
    }
    getInvoice()
  }, [invoiceId])

  const bodyToUpdate = () => {
    return {
      number: invoice?.number,
      id: invoiceIdValue,
      clientName: invoice?.clientName,
      totalPrice: invoice.totalPrice,
      startDate: invoice?.startDate,
      endDate: invoice?.endDate,
      orders: invoice?.ordersPayed,
      prevInvoiceOutStandingBalance: invoice?.prevInvoiceOutStandingBalance || "",
      pricePayed,
      checkNumber,
      payments,
    }
  }

  const updateInvoice = async() => {
    const response = await editInvoiceById(invoiceId, bodyToUpdate())
    if(response.invoice) {
      await getAllClients()
      navigate(`/invoice/list`)
      const text = `The invoice ${invoice?.id || invoice?.number} was successfully updated`
      shootSwal('Success!', text, 'success')
    }else{
      const text = response[0].msg
      shootSwal('Error!', text, 'error')
    }
  }

  const ordersWithDateFormatted = (orders) => {
    return orders.map(order => ({
      ...order,
      deliveredDate: moment(order.deliveredDate).format(USA_DATE_FORMAT),
      price: formatCurrency(order.price),
      id: order._id,
    }))
  }

  const validatePrices = async() => {
    if(invoice?.totalPrice < pricePayed){
      const text = `Price paid ${formatCurrency(pricePayed)} should not be grater than price ${formatCurrency(invoice?.totalPrice)}`
      shootSwal('Error!', text, 'error')
    }else {
      await updateInvoice()
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    await validatePrices()
  }

  const navigateTo = () => {
    navigate(`/invoice/edit/${outStandingBalanceinvoice?._id}`,{ replace: true })
    window.location.reload()
  }

  const handleAddPayment = () => {
    setPayments(prevState => [
      ...prevState,
      {id: uuidv4(), price: null, type: null, date: null}
    ])
  }

  const handleDeletePayment = (id) => {
    setPayments((prevState) => prevState.filter((payment) => payment.id !== id))
  }

  const handleSetValue = (id, property, value) => {
    setPayments((prevState) => 
      prevState.map((payment) => {
        if (payment.id === id) {
          return { ...payment, [property]:  value}
        }
        return payment
      })
    )
  }

  return (
    <Form title={title} onSubmit={onSubmit} key={invoiceId} >
      {
        (invoice?.id) &&
          <>
            {
              !!invoice?.prevInvoiceOutStandingBalance &&
                <Container sx={{border: "1px solid #1D4ED8", borderRadius: "4px", p: 1, mb: 2, background: "#1d4ed80d"}}>
                  <Typography sx={{display: "flex", gap: 0.5}}>
                    The client {clientInfo?.name} has a pending balance in the <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={navigateTo}>invoice {outStandingBalanceInvoice?.id}</span> of {formatCurrency(invoice?.prevOutStandingBalance)} USD.
                    Order's price of current invoice is {formatCurrency(ordersValues)} USD.
                  </Typography>
                </Container>
            }
            <div className="flex mb-7">
              <InputLabelContainer
                type="text"
                text="Invoice Number"
                placeholder="123456"
                name="id"
                inputValue={invoiceIdValue}
                setInputValue={setInvoiceIdValue}
              />
              <InputLabelContainer
                type="text"
                text="Client Name"
                placeholder="Crisjon"
                name="clientName"
                css="ml-3"
                readOnly={true}
                inputValue={invoice?.clientName}
              />
              <InputLabelContainer
                type="text"
                text="Total Price"
                placeholder={0}
                name="totalPrice"
                css="ml-3"
                readOnly={true}
                inputValue={formatCurrency(invoice?.totalPrice)}
              />
              <InputLabelContainer
                type="text"
                text="Prev Order Pending Balance"
                placeholder={0}
                name="outstandingBalance"
                css="ml-3"
                readOnly={true}
                inputValue={formatCurrency(outstandingBalance)}
              />
            </div>
            <div className="flex mb-7">
              <InputLabelContainer
                type="date"
                text="Start Date"
                name="startDate"
                css="flex flex-col text-center"
                readOnly={true}
                inputValue={moment(invoice?.startDate).format(DATA_PICKER_FORMAT)}
              />
              <InputLabelContainer
                type="date"
                text="End Date"
                name="endDate"
                css="flex flex-col text-center ml-3"
                readOnly={true}
                inputValue={moment(invoice?.endDate).format(DATA_PICKER_FORMAT)}
              />
            </div>
            <div className="mb-7">
              <Typography sx={{textAlign: "center", fontSize: 18, fontWeight: 500, mb: 2}}>
                Orders
              </Typography>
              <DataGridCustom
                columns={columns}
                rows={ordersWithDateFormatted(invoice?.ordersPayed)}
                filterKeys={columns.map(column => column.field)}
                sortProperty="id"
                route="order"
              />
            </div>
            {
              !!payments.length &&
                <Box sx={{display: "flex", justifyContent: "space-around"}}>
                  <Typography sx={{textAlign: "center", fontSize: 18, fontWeight: 500, mb: 2}}>
                    Total paid: {formatCurrency(pricePayed)}
                  </Typography>
                  <Typography sx={{textAlign: "center", fontSize: 18, fontWeight: 500, mb: 2}}>
                    Order Pending Balance: {formatCurrency(orderPendingBalanceIsNegative)}
                  </Typography>
                </Box>
            }
            {
              payments.map(payment => (
                <Box sx={{ width: "85%", m: "auto", mb: 3 }} key={payment.id}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      size="small"
                      label="Price Paid"
                      fullWidth
                      value={payment.price}
                      type="number"
                      onChange={(event) => handleSetValue(payment.id, "price", event.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Payment Date"
                        value={payment.date ? dayjs(payment.date) : null}
                        format={USA_DATE_FORMAT}
                        onChange={(e) => handleSetValue(payment.id, "date", moment(e).format(USA_DATE_FORMAT))}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                          },
                        }}
                        maxDate={dayjs()}
                      />
                    </LocalizationProvider>
                    <TextField
                      size="small"
                      label="Payment Type"
                      select={true}
                      fullWidth
                      value={payment.type}
                      onChange={(event) => handleSetValue(payment.id, "type", event.target.value)}
                    >
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="check">Check</MenuItem>
                    </TextField>
                    {
                      payment.type === 'check' && 
                        <TextField
                          size="small"
                          label="Check Number"
                          fullWidth
                          value={payment.checkNumber}
                          onChange={(event) => handleSetValue(payment.id, "checkNumber", event.target.value)}
                        />
                    }
                    <Tooltip title="Delete payment" placement="right-start">
                      <IconButton onClick={() => handleDeletePayment(payment.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))
            }
            {
              isOldInvoice ?
              <Box sx={{display: "flex", justifyContent: "center", mb: 3, border: "1px solid #1D4ED8", borderRadius: "4px", background: "#1d4ed80d", width: "90%", mx: "auto"}}>
                <Typography>This order is paid {formatCurrency(invoice.pricePayed)}</Typography>
              </Box>
              :
              <Box sx={{display: "flex", justifyContent: "center", mb: 5}}>
                <ButtonMUI variant="contained" sx={{gap: 1}} onClick={handleAddPayment}>
                  <FontAwesomeIcon icon={faCirclePlus} />
                  Add payment
                </ButtonMUI>
              </Box>
            }
            <Box sx={{display: "flex", justifyContent: "center", mb: 5}}>
              <ButtonMUI variant="contained" sx={{gap: 1}} type="submit" disabled={disabledButton}>
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                Edit invoice
              </ButtonMUI>
            </Box>
          </>
      }
    </Form>
  )
}
