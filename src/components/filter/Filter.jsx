import { Button } from "../form"

export const Filter = ({children, onClick, error}) => {
  return (
    <div className="flex justify-center py-2 min-w-full max-w-full sm:px-6 lg:px-8">
      <div
        className="flex flex-col text-center p-2 md:w-[65%] sm:w-full border-2 border-inherit rounded-md bg-gray-100"
      >
        <div className="flex justify-around items-center my-2">
          {children}
        </div>
        {
          error &&
            <div className="my-2" >
              <p className="text-red-500">
                <span className="italic">End date</span> can not be lower than <span className="italic">start date</span>
              </p>
            </div>
        }
        <div className="mt-4 mb-3" >
          <Button onClick={onClick} text="Apply filters" />
        </div>
      </div>
    </div>
  )
}
