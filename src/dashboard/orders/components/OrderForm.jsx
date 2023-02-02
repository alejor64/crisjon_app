import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react"
import { Form, InputLabelContainer, SelectInputContainer, Button } from "../../../components/form"

const ClientsOptions = ({client, setClient}) => {
  const clientsOPtions = [{name: "Alejor"}, {name: "Erika"}]

  useEffect(() => {
    if(client){
      setClient(client)
    }
  }, [client])
  

  return (
    <SelectInputContainer
      name="client"
      text="Client"
      value={client}
      onChange={(e) => setClient(e.target.value)}
    >
      <option value="">-- Item --</option>
      {
        clientsOPtions.map(clientOption => (
          <option value={clientOption.name} key={clientOption.name}>
            {clientOption.name}
          </option>
        ))
      }
    </SelectInputContainer>
  )
}

export const OrderForm = forwardRef(({title, buttonText, buttonIcon, edit = false, order}, _ref) => {

  const [orderName, setOrderName] = useState(order?.name || "")
  const [clientJobName, setClientJobName] = useState(order?.client_job_name || "")
  const [serviceValue, setServiceValue] = useState("")
  const [description, setDescription] = useState(order?.description || "")
  const [itemValue, setItemValue] = useState("")
  const [cadNumber, setCadNumber] = useState(order?.cad_number || 0)
  const [client, setClient] = useState(order?.client || "")
  const [dueDate, setDueDate] = useState(order?.due_date || "")
  const [statusValue, setStatusValue] = useState("")
  const [deliveredDate, setDeliveredDate] = useState(order?.delivered_date || "")
  const [paymentDate, setPaymentDate] = useState(order?.payment_date || "")
  const [price, setPrice] = useState(order?.price || "$0")
  const [paymentTypeValue, setPaymentTypeValue] = useState("")
  const [checkNumber, setCheckNumber] = useState(order?.check_number || 0)
  const [rushValue, setRushValue] = useState(false)
  const [doneValue, setDoneValue] = useState(false)
  const [returnedValue, setReturnedValue] = useState(false)

  useEffect(() => {
    setValue('rush', setRushValue)
    setValue('done', setDoneValue)
    setValue('returned', setReturnedValue)
    setValue('service', setServiceValue)
    setValue('item', setItemValue)
    setValue('status', setStatusValue)
    setValue('payment_type', setPaymentTypeValue)
  }, [])

  const setValue = (key, setValue) => {
    if(order?.[key]){
      setValue(order[key])
    }
  }

  const onChangeValue = (e, setValueOnChage) => {
    setValueOnChage(e.target.value)
  }

  const onChangeRushValue = () => {
    setRushValue(!rushValue)
  }

  const onChangeDone = () => {
    setDoneValue(!doneValue)
  }
  
  const onChangeReturned = () => {
    setReturnedValue(!returnedValue)
  }

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      return {
        name: orderName,
        clientJobName,
        service: serviceValue,
        description,
        item: itemValue,
        cadNumber,
        client,
        dueDate,
        status: statusValue,
        deliveredDate,
        paymentDate,
        price,
        paymentType: paymentTypeValue,
        checkNumber,
        rush: rushValue,
        done: doneValue,
        return: returnedValue,
      }
    }
  }))

  return (
    <Form title={title}>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Name"
          placeholder="Ring"
          name="name"
          inputValue={orderName}
          setInputValue={setOrderName}
          required={true}
        />
        <InputLabelContainer
          type="text"
          text="Client job name"
          placeholder="Ring rolling"
          name="client_job_name"
          inputValue={clientJobName}
          setInputValue={setClientJobName}
          css="ml-3"
        />
      </div>
      <div className="flex mb-7">
        <SelectInputContainer
          name="service"
          text="Service"
          required={true}
          value={serviceValue}
          onChange={(e) => onChangeValue(e, setServiceValue)}
        >
          <option value="">-- Service --</option>
          <option value="repair_polish">Repair and Polish</option>
          <option value="polishing">Polishing</option>
          <option value="engraving">Engraving</option>
          <option value="cad">CAD</option>
          <option value="sizing_up">Sizing Up</option>
          <option value="sizing_down">Sizing Down</option>
          <option value="polish_rodioum">Polish and Rodioum</option>
          <option value="plating">Plating</option>
          <option value="tighten_stones">Tighten Stones</option>
          <option value="retip_prongs">Retip Prongs</option>
          <option value="assembling">Assembling</option>
          <option value="soldering">Soldering</option>
          <option value="other">Other</option>
        </SelectInputContainer>
        <InputLabelContainer
          type="text"
          text="Description"
          placeholder="Add two diamonds"
          name="description"
          inputValue={description}
          setInputValue={setDescription}
          css="ml-3"
        />
      </div>
      <div className="flex mb-7">
        <SelectInputContainer
          name="item"
          text="Item"
          value={itemValue}
          onChange={(e) => onChangeValue(e, setItemValue)}
        >
          <option value="">-- Item --</option>
          <option value="ring">Ring</option>
          <option value="eng_ring">Eng. Ring</option>
          <option value="cufflicks">Cufflinks</option>
          <option value="bangle">Bangle</option>
          <option value="bangle">Bracelet</option>
          <option value="earring">Earring</option>
          <option value="chain">Chain</option>
          <option value="necklace">Necklace</option>
          <option value="pendant">Pendant</option>
          <option value="glasses">Glasses</option>
          <option value="medal">Medal</option>
          <option value="other">Other</option>
        </SelectInputContainer>
        <InputLabelContainer
          type="text"
          text="CAD Number"
          placeholder="123ae"
          name="cad_number"
          inputValue={cadNumber}
          setInputValue={setCadNumber}
          css="ml-3"
          required={true}
        />
      </div>
      <div className="flex mb-7">
        <ClientsOptions client={client} setClient={setClient} />
        <InputLabelContainer
          type="date"
          text="Due date"
          name="due_date"
          css="ml-3"
          inputValue={dueDate}
          setInputValue={setDueDate}
        />
      </div>
      <div className="flex mb-7">
        <SelectInputContainer
          name="status"
          text="Status"
          required={true}
          value={statusValue}
          onChange={(e) => onChangeValue(e, setStatusValue)}
        >
          <option value="">-- Status --</option>
          <option value="first">First</option>
          <option value="second">Second</option>
        </SelectInputContainer>
        <InputLabelContainer
          type="date"
          text="Delivered date"
          name="delivered_date"
          css="ml-3"
          inputValue={deliveredDate}
          setInputValue={setDeliveredDate}
        />
      </div>
    {
      edit && (
        <>
          <div className="flex mb-7">
            <InputLabelContainer
              type="date"
              text="Payment date"
              name="payment_date"
              inputValue={paymentDate}
              setInputValue={setPaymentDate}
            />
            <InputLabelContainer
              type="text"
              text="Price"
              name="price"
              css="ml-3"
              inputValue={price}
              setInputValue={setPrice}
            />
          </div>
          <div className="flex mb-7">
            <SelectInputContainer
              name="payment_type"
              text="Payment type"
              required={true}
              value={paymentTypeValue}
              onChange={(e) => onChangeValue(e, setPaymentTypeValue)}
            >
              <option value="">-- payment type --</option>
              <option value="cash">Cash</option>
              <option value="check">Check</option>
            </SelectInputContainer>
            {
              paymentTypeValue == 'check' && 
                <InputLabelContainer
                  type="number"
                  text="Check Number"
                  name="check_number"
                  css="ml-3"
                  inputValue={checkNumber}
                  setInputValue={setCheckNumber}
                />
            }
          </div>
        </>
      )
    }
      <div className="flex mb-7">
        <input
          type="checkbox"
          id="rush"
          name="rush_value"
          checked={rushValue}
          onChange={onChangeRushValue}
        />
        <span className='ml-1'>Mark as rush</span>
      </div>
      {
        edit && (
          <>
            <div className="flex mb-7">
              <input
                type="checkbox"
                id="done"
                name="done_value"
                checked={doneValue}
                onChange={onChangeDone}
              />
              <span className='ml-1'>Mark as done</span>
            </div>
            <div className="flex mb-7">
              <input
                type="checkbox"
                id="returned"
                name="returned_value"
                checked={returnedValue}
                onChange={onChangeReturned}
              />
              <span className='ml-1'>Mark as returned</span>
            </div>
          </>
        )
      }
      <div className="px-4 py-3 flex justify-around sm:px-6">
        <Button text={buttonText} icon={buttonIcon} />
        {/* {
          edit && (
            <>
              <Button text="Delete" icon={faTrashCan} deleteButton={true} />
            </>
          )
        } */}
      </div>
    </Form>
  )
})
