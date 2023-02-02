import { Navigate, Route, Routes } from "react-router-dom"
import { OrderPage, NewOrderPage, EditOrderPage } from "../pages"

export const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewOrderPage />} />
      <Route path="list" element={<OrderPage />} />
      <Route path="client/:clientId" element={<OrderPage />} />
      <Route path="edit/:orderId" element={<EditOrderPage />} />
      <Route path="/*" element={<Navigate to="/order/list" />} />
    </Routes>
  )
}
