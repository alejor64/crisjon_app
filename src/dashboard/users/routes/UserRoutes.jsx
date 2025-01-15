import { Navigate, Route, Routes } from "react-router-dom"
import { EditUserPage, NewUserPage, UserPage } from "../pages"

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="list" replace />} />
      <Route path="list" element={<UserPage />} />
      <Route path="new" element={<NewUserPage />} />
      <Route path="edit/:userId" element={<EditUserPage />} />
      <Route path="*" element={<Navigate to="list" replace />} />
    </Routes>
  )
}
