import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ClientRoutes } from "../dashboard/clients/routes/ClientRoutes"
import { UserRoutes } from "../dashboard/users/routes/UserRoutes"
import { OrderRoutes } from "../dashboard/orders/routes/OrderRoutes"
import { EstimateRoutes } from "../dashboard/estimate/routes/EstimateRoutes"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="auth/*" element={ <AuthRoutes />} />
      <Route path="client/*" element={ <ClientRoutes />} />
      <Route path="user/*" element={ <UserRoutes />} />
      <Route path="order/*" element={ <OrderRoutes />} />
      <Route path="estimate/*" element={ <EstimateRoutes />} />
      <Route path="/*" element={ <Navigate to="/client" />} />
    </Routes>
  )
}
