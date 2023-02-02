import { useEffect, useState } from "react"
import { Form, InputLabelContainer, SelectInputContainer, Button } from "../../../components/form"

export const UserForm = ({title, buttonText, buttonIcon, user}) => {
  const [roleValue, setRoleValue] = useState("")

  const onChangeValue = (e, setValue) => {
    setValue(e.target.value)
  }

  const setValue = (key, setValue) => {
    if(user?.[key]){
      setValue(user[key])
    }
  }

  useEffect(() => {
    setValue('role', setRoleValue)
  }, [])
  

  return (
    <Form title={title}>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Name"
          placeholder="Santiago"
          name="name"
          inputValue={user?.name ? user.name : ""}
        />
        <InputLabelContainer
          type="text"
          text="Email"
          placeholder="example@example.com"
          name="email"
          css="ml-3"
          inputValue={user?.email ? user.email : ""}
        />
      </div>
      <SelectInputContainer
        name="role"
        text="Role"
        value={roleValue}
        onChange={(e) => onChangeValue(e, setRoleValue)}
      >
        <option value="">-- Select role --</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </SelectInputContainer>
      <div className="px-4 py-3 text-center sm:px-6">
        <Button text={buttonText} icon={buttonIcon} />
      </div>
    </Form>
  )
}
