import { Navigate, Route, Routes } from "react-router-dom"
import { InvoicePage, EditInvoicePage } from "../pages"

export const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="list" replace />} />
      <Route path="list" element={<InvoicePage />} />
      <Route path="edit/:invoiceId" element={<EditInvoicePage />} />
      <Route path="*" element={<Navigate to="list" replace />} />
    </Routes>
  )
}