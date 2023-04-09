import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import moment from "moment"
import { Form, InputLabelContainer, SelectInputContainer, Button, TextareaContainer } from "../../../components/form"
import { ClientsOptions } from "./formComponents/ClientsOptions"
import { ItemOptions } from "./formComponents/ItemOptions"
import { ServiceOptions } from "./formComponents/ServiceOptions"
import { DATA_PICKER_FORMAT, USA_DATE_FORMAT } from "../../../utils/constants"

const date = (order, key) => {
  if(order?.[key]) return moment(order?.[key]).format(DATA_PICKER_FORMAT)
  return '';
}

export const OrderForm = forwardRef(({title, buttonText, buttonIcon, edit = false, order, onSubmit}, _ref) => {
  const [name, setName] = useState(order?.name ||"")
  const [clientJobName, setClientJobName] = useState(order?.clientJobName || "")
  const [service, setService] = useState(order?.service || "")
  const [description, setDescription] = useState(order?.description || "")
  const [item, setItem] = useState(order?.item || "")
  const [cadNumber, setCadNumber] = useState(order?.cadNumber || 0)
  const [clientName, setClientName] = useState(order?.clientName || "")
  const [dueDate, setDueDate] = useState(date(order, 'dueDate'))
  const [status, setStatus] = useState(order?.status || "")
  const [deliveredDate, setDeliveredDate] = useState(date(order, 'deliveredDate'))
  const [paymentDate, setPaymentDate] = useState(date(order, 'paymentDate'))
  const [price, setPrice] = useState(order?.price || 0)
  const [paymentType, setPaymentType] = useState(order?.paymentType || "")
  const [checkNumber, setCheckNumber] = useState(order?.checkNumber || 0)
  const [rush, setRush] = useState(order?.rush || false)
  const [done, setDone] = useState(order?.done || false)
  const [delivered, setDelivered] = useState(order?.delivered || false)
  const [note, setNote] = useState(order?.note || "")

  const onChangeRush = () => {
    setRush(!rush)
  }

  const onChangeDone = () => {
    setDone(!done)
  }
  
  const onChangedelivered = () => {
    setDelivered(!delivered)
  }

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      return {
        name,
        clientName,
        clientJobName,
        service,
        description,
        item,
        cadNumber,
        dueDate,
        status,
        deliveredDate,
        paymentDate,
        price,
        paymentType,
        checkNumber,
        rush,
        done,
        delivered,
        jobId: order?.jobId,
        note,
      }
    }
  }))

  return (
    <Form title={title} onSubmit={onSubmit}>
      {
        paymentDate &&
          <div className="text-center my-3 bg-slate-200 p-3 rounded">
            <h3 className="font-medium">This order was payed was payed on {moment(paymentDate).format(USA_DATE_FORMAT)}</h3>
          </div>
      }
      {
        <>
          <div className="flex mb-7">
            <InputLabelContainer
              type="text"
              text="Order Name"
              placeholder="Ring"
              name="name"
              inputValue={name}
              setInputValue={setName}
              required={true}
              readOnly={!!paymentDate}
            />
            <InputLabelContainer
              type="text"
              text="Client job name"
              placeholder="Ring rolling"
              name="clientJobName"
              inputValue={clientJobName}
              setInputValue={setClientJobName}
              css="ml-3"
              required={true}
              readOnly={!!paymentDate}
            />
          </div>
          <div className="flex mb-7">
            <ServiceOptions value={service} setValue={setService} disabled={!!paymentDate} />
            <InputLabelContainer
              type="text"
              text="Description"
              placeholder="Add two diamonds"
              name="description"
              inputValue={description}
              setInputValue={setDescription}
              css="ml-3"
              required={true}
              readOnly={!!paymentDate}
            />
          </div>
          <div className="flex mb-7">
            <ItemOptions value={item} setValue={setItem} disabled={!!paymentDate} />
            <InputLabelContainer
              type="text"
              text="CAD Number"
              placeholder="123ae"
              name="cadNumber"
              inputValue={cadNumber}
              setInputValue={setCadNumber}
              css="ml-3"
              readOnly={!!paymentDate}
            />
          </div>
          <div className="flex mb-7">
            <ClientsOptions client={clientName} setClient={setClientName} disabled={!!paymentDate} />
            <InputLabelContainer
              type="date"
              text="Due date"
              name="dueDate"
              css="ml-3"
              inputValue={dueDate}
              setInputValue={setDueDate}
              readOnly={!!paymentDate}
            />
          </div>
          <div className="flex mb-7">
            <SelectInputContainer
              name="status"
              text="Status"
              value={status}
              setValue={setStatus}
              disabled={!!paymentDate}
            >
              <option value="">-- Status --</option>
              <option value="Polishing">Polishing</option>
              <option value="Design">Design</option>
              <option value="Casting">Casting</option>
              <option value="Setting">Setting</option>
              <option value="Jeweler">Jeweler</option>
              <option value="Done">Done</option>
              <option value="Engraving">Engraving</option>
              <option value="Hold">Hold</option>
            </SelectInputContainer>
            <InputLabelContainer
              type="date"
              text="Delivered date"
              name="deliveredDate"
              css="ml-3"
              inputValue={deliveredDate}
              setInputValue={setDeliveredDate}
              required={!!price}
            />
          </div>
        {
          edit && (
            <>
              <div className="flex mb-7">
                <InputLabelContainer
                  type="date"
                  text="Payment date"
                  name="paymentDate"
                  inputValue={paymentDate}
                  setInputValue={setPaymentDate}
                  readOnly={true}
                />
                <InputLabelContainer
                  type="text"
                  text="Price"
                  name="price"
                  css="ml-3"
                  inputValue={price}
                  setInputValue={setPrice}
                  readOnly={!!paymentDate}
                  required={!!deliveredDate}
                />
              </div>
              <div className="flex mb-7">
                <InputLabelContainer
                  type="text"
                  name="payment_type"
                  text="Payment type"
                  inputValue={paymentType}
                  setInputValue={setPaymentType}
                  readOnly={!!paymentDate}
                />
                {
                  paymentType == 'check' && 
                    <InputLabelContainer
                      type="number"
                      text="Check Number"
                      name="checkNumber"
                      css="ml-3"
                      inputValue={checkNumber}
                      setInputValue={setCheckNumber}
                      readOnly={!!paymentDate}
                    />
                }
              </div>
            </>
          )
        }
          <div className="flex">
            <div className="w-1/2">
              <div className="flex mb-7">
                <input
                  type="checkbox"
                  id="rush"
                  name="rush_value"
                  checked={rush}
                  onChange={onChangeRush}
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
                        checked={done}
                        onChange={onChangeDone}
                      />
                      <span className='ml-1'>Mark as done</span>
                    </div>
                  </>
                )
              }
            </div>
            <div className="w-1/2">
              <TextareaContainer
                name="note"
                text="Note"
                value={note}
                setInputValue={setNote}
              />
            </div>
          </div>
          <div className="px-4 py-3 flex justify-around sm:px-6">
            <Button text={buttonText} icon={buttonIcon} disabled={!!paymentDate} />
          </div>
        </>
      }
    </Form>
  )
})
