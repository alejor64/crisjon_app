export const Form = ({children, title, onSubmit}) => {
  return (
    <form onSubmit={onSubmit} >
      <div className="bg-white px-4 py-5 sm:p-6">
        <h2 className="text-2xl text-center mt-2 mb-6">{title}</h2>
        {children}
      </div>
  </form>
  )
}
