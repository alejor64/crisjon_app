import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ClientRoutes } from "../dashboard/clients/routes/ClientRoutes"
import { UserRoutes } from "../dashboard/users/routes/UserRoutes"
import { OrderRoutes } from "../dashboard/orders/routes/OrderRoutes"
import { EstimateRoutes } from "../dashboard/estimate/routes/EstimateRoutes"
import { CHECKING, NOT_AUTHENTICATED } from "../utils/constants"
import { Loader } from "../components/loader"
import { useAuthStore } from "../hooks"

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if( status === CHECKING) return <Loader />

  return (
    <Routes>
      {
        status === NOT_AUTHENTICATED
        ? <Route path="auth/*" element={ <AuthRoutes />} />
        : <>
            <Route path="client/*" element={ <ClientRoutes />} />
            <Route path="user/*" element={ <UserRoutes />} />
            <Route path="order/*" element={ <OrderRoutes />} />
            <Route path="estimate/*" element={ <EstimateRoutes />} />
            <Route path="/*" element={ <Navigate to="/client" />} />
          </>
      }
      <Route path="/*" element={ <Navigate to="/auth" />} />
    </Routes>
  )
}
