import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { formatCurrency } from '../../../../utils/functions'

const Input = ({type, name, value, handleInputChange, index, css, readOnly = false}) => {
  return (
    <input
      type={type}
      name={name}
      className={`mt-1 pl-2 py-1.5 md:py-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none focus:ring-blue-700 focus:ring-1 sm:text-sm ${css}`}
      value={value}
      onChange={(e) => handleInputChange(index, e)}
      readOnly={readOnly}
    />
  )
}

export const BreakDown = ({inputs, setInputs}) => {
  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const newInputs = [...inputs]
    newInputs[index][name] = value
    const {quantity, priceEach} = newInputs[index]
    newInputs[index].amount = formatCurrency(quantity * priceEach)
    if (Object.values(newInputs[index]).every(value => value.trim() === '') && newInputs.length > 1) {
      newInputs.splice(index, 1);
    }
    setInputs(newInputs)
    checkIfInputsAreFull(index)
  };

  const handleAddInputRow = () => {
    setInputs([
      ...inputs,
      { quantity: '', service: '', priceEach: '', amount: '' }
    ]);
  }

  const checkIfInputsAreFull = (index) => {
    const currentInput = inputs[index];
    const inputsAreFull = Object.values(currentInput).every(value => value.trim() !== '');
    if (inputsAreFull && index === inputs?.length - 1) {
      handleAddInputRow();
    }
  };
  
  const handleRemoveInputRow = (index) => {
    if (inputs?.length > 1) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };
  
  
  return(
    <>
      <div className="flex mb-7 justify-center items-center">
        <h2 className="text-xl">Breakdown</h2>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="min-h-[25px] text-green-500 cursor-pointer ml-3"
          onClick={handleAddInputRow}
        />
      </div>
      <div className="flex mb-1 w-[98%]">
        <label className="block text-sm font-medium text-gray-700 w-full">
          Quantity
        </label>
        <label className="block text-sm font-medium text-gray-700 w-full">
          Item Service
        </label>
        <label className="block text-sm font-medium text-gray-700 w-full">
          Price Each
        </label>
        <label className="block text-sm font-medium text-gray-700 w-full">
          Amount
        </label>
      </div>
      {
        inputs.map((detail, index) => (
          <div className="flex mb-7 items-center" key={index}>
            <Input
              value={detail.quantity}
              handleInputChange={handleInputChange}
              index={index}
              type="number"
              name="quantity"
            />
            <Input
              value={detail.service}
              handleInputChange={handleInputChange}
              index={index}
              css="ml-3"
              type="text"
              name="service"
            />
            <Input
              value={detail.priceEach}
              handleInputChange={handleInputChange}
              index={index}
              css="ml-3"
              type="number"
              name="priceEach"
            />
            <Input
              value={detail.amount}
              handleInputChange={handleInputChange}
              index={index}
              css="ml-3"
              type="text"
              name="amount"
              readOnly={true}
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="min-h-[25px] text-red-500 cursor-pointer ml-3"
              onClick={() => handleRemoveInputRow(index)}
            />
          </div>
        ))
      }
    </>
  )
}
