import { Navigate, Route, Routes } from "react-router-dom"
import { EstimatePage, NewEstimatePage, EditEstimatedPage } from "../pages"

export const EstimateRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewEstimatePage />} />
      <Route path="list" element={<EstimatePage />} />
      <Route path="edit/:estimateId" element={<EditEstimatedPage />} />
      <Route path="/*" element={<Navigate to="/estimate/list" />} />
    </Routes>
  )
}
