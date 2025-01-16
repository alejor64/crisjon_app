import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ClientRoutes } from "../dashboard/clients/routes/ClientRoutes";
import { ClientBookRoutes } from "../dashboard/clients_book/routes/CientBookRoutes";
import { UserRoutes } from "../dashboard/users/routes/UserRoutes";
import { OrderRoutes } from "../dashboard/orders/routes/OrderRoutes";
import { InvoiceRoutes } from "../dashboard/invoice/routes/InvoiceRoutes";
import { EstimateRoutes } from "../dashboard/estimate/routes/EstimateRoutes";
import { CHECKING, NOT_AUTHENTICATED } from "../utils/constants";
import { Loader } from "../components/loader";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, role, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === CHECKING) return <Loader />;

  return (
    <Routes>
      {status === NOT_AUTHENTICATED ? (
        <Route path="auth/*" element={<AuthRoutes />} />
      ) : (
        <>
          <Route path="client/*" element={<ClientRoutes />} />
          <Route path="client-book/*" element={<ClientBookRoutes />} />
          <Route path="user/*" element={<UserRoutes />} />
          <Route path="order/*" element={<OrderRoutes />} />
          <Route path="estimate/*" element={<EstimateRoutes />} />
          <Route path="invoice/*" element={<InvoiceRoutes />} />
          <Route path="/*" element={<Navigate to="client/list" replace />} />
        </>
      )}
    </Routes>
  );
};
