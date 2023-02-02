import { Link } from 'react-router-dom'
import { Table } from "../../components/Table/Table"
import { DashboardLayout } from "../../layout"

export const EstimatePage = () => {
  const thList = ['Created at', 'Client', 'Order', 'Price']
const tdList = [
  {
    id: '1a2b',
    created_at: new Date().toLocaleDateString(),
    client: 'Crisjon',
    order: 'Something',
    price: '3146'
  },
]

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h2 className="text-3xl text-center my-2">
          ESTIMATES
        </h2>
        <h2 className="text-3xl text-center my-2">
          CUADRAR EL PRECIO DEL ORO EN LA DB DE LA API
        </h2>
        <div className="mt-2">
          <div className="py-2 inline-block min-w-full max-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {
                tdList.length
                ? <Table thList={thList} tdList={tdList} route="estimate" />
                : <h2>No hay estimaciones</h2>
              }
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex justify-around sm:px-6">
          <Link
            className="border-2 p-2 rounded-lg border-blue-700 bg-blue-700 text-white w-[300px] hover:bg-blue-800 hover:shadow-md text-center"
            to="/estimate/new"
          >
            Make an estimate
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
