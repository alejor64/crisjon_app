import { useState } from "react"

export const SumOfPrice = ({orderList}) => {
  const totalOrders = orderList.filter(item => !item.paymentDate)
  const totalOrdersPrice = totalOrders.reduce((accumulator, currentValue) => {
    const price = parseFloat(currentValue.price) || 0
    return accumulator + price
  }, 0)

  return (
    <div className="flex justify-center py-2 min-w-full max-w-full sm:px-6 lg:px-8">
      <div className="flex flex-col text-center p-2 md:w-[65%] sm:w-full border-2 border-inherit rounded-md">
        <h2 className="py-2 text-lg font-medium">
          Summary of all delivered orders
        </h2>
        <div className="flex justify-around py-2">
          <p>Quantity: {totalOrders.length}</p>
          <p>Debt: ${totalOrdersPrice}</p>
        </div>
      </div>
    </div>
  )
}
