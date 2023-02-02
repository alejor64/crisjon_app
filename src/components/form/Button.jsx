import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = ({text, icon, deleteButton = false, onClick}) => {
  return (
    <button
      className={`inline-flex justify-center items-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${ deleteButton ? 'bg-red-700 focus:ring-red-500 hover:bg-red-800' : 'bg-blue-700 focus:ring-blue-500 hover:bg-blue-800'}`}
      onClick={onClick}
    >
      <span className='mr-2'>{text}</span>
      {
        icon && <FontAwesomeIcon icon={icon} />
      }
    </button>
  )
}
