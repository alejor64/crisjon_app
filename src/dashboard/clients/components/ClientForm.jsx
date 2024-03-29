import { useImperativeHandle, forwardRef, useState } from "react"
import { Form, InputLabelContainer, Button } from "../../../components/form"
import { formatCurrency } from "../../../utils/functions"

export const ClientForm = forwardRef(({ buttonIcon, buttonText, title, client, onSubmit }, _ref) => {
  const createdAtDefaultValue = new Date().toISOString().split('T')[0]
  const [favorite, setFavorite] = useState(client?.favorite || false)
  const [name, setName] = useState(client?.name || "")
  const [phone, setPhone] = useState(client?.phone || "")
  const [address, setAddress] = useState(client?.address || "")
  const [email, setEmail] = useState(client?.email || "")
  const [city, setCity] = useState(client?.city || "")
  const [state, setState] = useState(client?.state || "")
  const [fein, setFein] = useState(client?.fein || "")
  const [sst, setSst] = useState(client?.sst || "")
  const [taxtIdNumber, setTaxtIdNumber] = useState(client?.taxIdNumber || "")
  const [outStandingBalance, setOutStandingBalance] = useState(client?.outstandingBalance || 0)
  const [outStandingBalanceInput, setOutStandingBalanceInput] = useState(outStandingBalance)
  const [zipCode, setZipCode] = useState(client?.zipCode || "")
  const [createdAt, setCreatedAt] = useState(client?.createdAt || createdAtDefaultValue)
  
  const onChange = () => {
    setFavorite(!favorite)
  }

  const onChageBalance = (event) => {
    const { value } = event.target;
    const decimalRegex = /^\d*\,?\d*$/
    if (decimalRegex.test(value)) {
      setOutStandingBalanceInput(value);
      const balance = parseFloat(value.replaceAll(',', '.'));
      setOutStandingBalance(balance);
    }
  }

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      return { name, phone, address, email, city, state, fein, sst, favorite, taxtIdNumber, zipCode, createdAt, outStandingBalance }
    }
  }))

  return (
    <Form title={title} onSubmit={onSubmit}>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Name"
          placeholder="Crisjon"
          name="name"
          inputValue={name}
          setInputValue={setName}
          required={true}
        />
        <InputLabelContainer
          type="number"
          text="Phone"
          placeholder="13127959303"
          name="phone"
          css="ml-3"
          inputValue={phone}
          setInputValue={setPhone}
          required={true}
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Address"
          placeholder="5 South Wabash Avenue"
          name="address"
          inputValue={address}
          setInputValue={setAddress}
          required={true}
        />
        <InputLabelContainer
          type="text"
          text="Email"
          placeholder="example@example.com"
          name="email"
          css="ml-3"
          inputValue={email}
          setInputValue={setEmail}
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="City"
          placeholder="Chicago"
          name="city"
          inputValue={city}
          setInputValue={setCity}
          required={true}
        />
        <InputLabelContainer
          type="text"
          text="State"
          placeholder="Illinois"
          name="state"
          css="ml-3"
          inputValue={state}
          setInputValue={setState}
          required={true}
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="number"
          text="FEIN"
          placeholder="123456789"
          name="fein"
          inputValue={fein}
          setInputValue={setFein}
          required={true}
        />
        <InputLabelContainer
          type="number"
          text="State Sales Tax"
          placeholder="123456789"
          name="SST"
          css="ml-3"
          inputValue={sst}
          setInputValue={setSst}
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="number"
          text="Tax ID Number"
          placeholder="147852369"
          name="taxIdNumber"
          inputValue={taxtIdNumber}
          setInputValue={setTaxtIdNumber}
        />
        <div className="w-full ml-3">
          <label htmlFor="outstandingBalance" className={`block text-sm font-medium text-gray-700`}>
            Pending Balance
          </label>
          <span className="mt-1 ml-2 block w-full rounded-md shadow border border-slate-200 focus:outline-none">
            <span className="ml-1">$</span>
            <input
              type="text"
              name="outstandingBalance"
              className="ml- w-[96%] pl-0 py-1.5 md:py-2 sm:text-sm focus:outline-none"
              value={outStandingBalanceInput}
              onChange={onChageBalance}
            />
          </span>
        </div>
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="number"
          text="Zip Code"
          placeholder="60603"
          name="zipCode"
          inputValue={zipCode}
          setInputValue={setZipCode}
          required={true}
        />
        <InputLabelContainer
          type="date"
          text="Created Date"
          name="createdAt"
          css="ml-3"
          inputValue={createdAt}
          setInputValue={setCreatedAt}
        />
      </div>
      <div className="flex mb-7">
        <input type="checkbox" id="favorite" checked={ favorite } onChange={ onChange } />
        <span className='ml-1'>Mark as favorite</span>
      </div>
      <div className="px-4 py-3 flex justify-around sm:px-6">
        <Button text={buttonText} icon={buttonIcon} />
      </div>
    </Form>
  )
})
