import { Navigate, Route, Routes } from "react-router-dom"
import { InvoicePage } from "../pages"

export const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<InvoicePage />} />
      <Route path="/*" element={<Navigate to="/invoice/list" />} />
    </Routes>
  )
}