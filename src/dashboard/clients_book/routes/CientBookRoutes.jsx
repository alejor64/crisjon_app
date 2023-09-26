import { Navigate, Route, Routes } from "react-router-dom";
import { ClientBookPage, EditClientBookPage, NewClientBookPage } from "../pages";

export const ClientBookRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewClientBookPage />} />
      <Route path="list" element={<ClientBookPage />} />
      <Route path="edit/:clientId" element={<EditClientBookPage />} />
      <Route path="/*" element={<Navigate to="/client-book/list" />} />
    </Routes>
  )
};
