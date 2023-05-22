
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DashboardLayout } from "../../layout"
import { InvoiceForm, InvoicePdf } from "../components"
import { getInvoiceById } from "../../../api/invoice"

export const EditInvoicePage = () => {
  const { invoiceId } = useParams()
  const navigate = useNavigate()
  const [showInvoicePdf, setShowInvoicePdf] = useState(false)
  const [invoice, setInvoice] = useState({})

  useEffect(() => {
    getInvoiceById(invoiceId)
      .then(response => {
        if(response?.invoice) {
          const { invoice: invoiceResponse } = response
          setInvoice(invoiceResponse)
        }
      })
  }, [])


  const goBackClic = () => {
    if(showInvoicePdf){
      setShowInvoicePdf(false)
    }else {
      navigate(-1)
    }
  }

  const generatePDF = () => {
    setShowInvoicePdf(!showInvoicePdf)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className='container flex justify-between mx-auto max-w-7xl px-2 mt-2'>
          <p
            onClick={goBackClic}
            className='underline text-blue-700 cursor-pointer'
          >
            Go back
          </p>
          <p
            onClick={generatePDF}
            className='underline text-blue-700 cursor-pointer'
          >
            Generate PDF
          </p>
        </div>
        <>
          {
            showInvoicePdf
            ?
              <InvoicePdf invoice={invoice} />
            :
              <InvoiceForm
                title="Edit Invoice"
              />
          }
        </>
      </div>
    </DashboardLayout>
  )
}