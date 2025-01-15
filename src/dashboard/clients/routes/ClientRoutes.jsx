import { Navigate, Route, Routes } from "react-router-dom"
import { ClientPage, EditClientPage, NewClientPage } from "../pages"

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="list" replace />} />
      <Route path="new" element={<NewClientPage />} />
      <Route path="list" element={<ClientPage />} />
      <Route path="edit/:clientId" element={<EditClientPage />} />
      <Route path="*" element={<Navigate to="list" replace />} />
    </Routes>
  )
}
