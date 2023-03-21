import { Navigate, Route, Routes } from "react-router-dom"
import { EstimatePage, NewEstimatePage } from "../pages"

export const EstimateRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewEstimatePage />} />
      <Route path="list" element={<EstimatePage />} />
      <Route path="/*" element={<Navigate to="/estimate/list" />} />
    </Routes>
  )
}
