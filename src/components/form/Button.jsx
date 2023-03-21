import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = ({text, icon, deleteButton = false, onClick, disabled = false, css = ''}) => {
  return (
    <button
      className={`inline-flex justify-center items-center rounded-md py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-400 disabled:ring-gray-400 ${css} ${ deleteButton ? 'bg-red-700 focus:ring-red-500 hover:bg-red-800' : 'bg-blue-700 focus:ring-blue-500 hover:bg-blue-800'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className='mr-2'>{text}</span>
      {
        icon && <FontAwesomeIcon icon={icon} />
      }
    </button>
  )
}
