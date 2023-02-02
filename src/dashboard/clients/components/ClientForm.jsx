import { Link } from "react-router-dom"
import { faRectangleList } from "@fortawesome/free-regular-svg-icons"
import { Form, InputLabelContainer, Button } from "../../../components/form"
import { useEffect, useState } from "react"

export const ClientForm = ({ buttonIcon, buttonText, title, client }) => {
  const [checkboxValue, setcheckboxValue] = useState(false)

  useEffect(() => {
    if(client?.favorite){
      setcheckboxValue(client.favorite)
    }
  }, [client])
  
  const onChange = () => {
    setcheckboxValue(!checkboxValue)
  }
  

  return (
    <Form title={title}>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Name"
          placeholder="Crisjon"
          name="name"
          inputValue={ client?.name ? client.name : "" }
          required={true}
        />
        <InputLabelContainer
          type="number"
          text="Phone"
          placeholder="3146418090"
          name="phone"
          css="ml-3"
          inputValue={ client?.phone? client.phone : "" }
          required={true}
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Address"
          placeholder="5 South Wabash Avenue"
          name="address"
          inputValue={ client?.address? client.address : "" }
          required={true}
        />
        <InputLabelContainer
          type="text"
          text="Email"
          placeholder="example@example.com"
          name="email"
          css="ml-3"
          inputValue={ client?.email? client.email : "" }
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="City"
          placeholder="Chicago"
          name="city"
          inputValue={ client?.city? client.city : "" }
        />
        <InputLabelContainer
          type="text"
          text="State"
          placeholder="Illinois"
          name="state"
          css="ml-3"
          inputValue={ client?.state? client.state : "" }
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="number"
          text="FEIN"
          name="fein"
          inputValue={ client?.fein? client.fein : "" }
        />
        <InputLabelContainer
          type="number"
          text="State Sales Tax"
          placeholder="123456789"
          name="SST"
          css="ml-3"
          inputValue={ client?.sst ? client.sst : "" }
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="number"
          text="Tax ID Number"
          placeholder="147852369"
          name="tax_id_number"
          inputValue={ client?.tax_id_number ? client.tax_id_number : "" }
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="number"
          text="Zip Code"
          placeholder="050035"
          name="zip_code"
          inputValue={ client?.zip_code ? client.zip_code : "" }
        />
        <InputLabelContainer
          type="date"
          text="Created Date"
          name="created_at"
          css="ml-3"
          inputValue={ client?.created_at ? client.created_at : "" }
        />
      </div>
      <div className="flex mb-7">
        <input type="checkbox" id="favorite" checked={ checkboxValue } onChange={ onChange } />
        <span className='ml-1'>Mark as favorite</span>
      </div>
      <div className="px-4 py-3 flex justify-around sm:px-6">
        <Button text={buttonText} icon={buttonIcon} />
        {
          client && (
            <Link
              to={`../../../order/client/${client.id}`}
              relative="path"
            >
              <Button text={`See ${client.name} orders`} icon={faRectangleList} />
            </Link>
          )
        }
      </div>
    </Form>
  )
}
