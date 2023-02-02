import { Navbar } from "../components/Navbar"

export const DashboardLayout = ({children}) => {
  return (
    <div className='container min-w-full'>
      <Navbar />
      {children}
    </div>
  )
}
