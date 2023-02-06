import { useImperativeHandle, useState, forwardRef } from "react"
import { Form, InputLabelContainer, SelectInputContainer, Button } from "../../../components/form"

export const UserForm = forwardRef(({title, buttonText, buttonIcon, user, onSubmit, createNew = false}, _ref) => {

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [role, setRole] = useState(user?.role || "")
  const [password, setPassword] = useState("")

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      if(createNew){
        return { name, email, role, password }
      }
      return { name, email, role }
    }
  }))

  return (
    <Form title={title} onSubmit={onSubmit}>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Name"
          placeholder="Santiago"
          name="name"
          inputValue={name}
          setInputValue={setName}
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
          required={true}
        />
      </div>
      <div className="flex mb-5">
        <SelectInputContainer
          name="role"
          text="Role"
          value={role}
          setValue={setRole}
          required={true}
        >
          <option value="">-- Select role --</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </SelectInputContainer>
        {
          createNew &&
          <InputLabelContainer
            type="password"
            text="Password"
            name="password"
            css="ml-3"
            inputValue={password}
            setInputValue={setPassword}
            required={true}
          />
        }
      </div>
      <div className="px-4 py-3 text-center sm:px-6">
        <Button text={buttonText} icon={buttonIcon} />
      </div>
    </Form>
  )
})
