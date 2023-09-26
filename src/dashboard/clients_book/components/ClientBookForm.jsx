import { useImperativeHandle, forwardRef, useState } from "react"
import { Form, InputLabelContainer, Button } from "../../../components/form"

export const ClientBookForm = forwardRef(({ buttonIcon, buttonText, title, client, onSubmit }, _ref) => {
  const [name, setName] = useState(client?.name || "")
  const [phone, setPhone] = useState(client?.phone || "")
  const [email, setEmail] = useState(client?.email || "")
  const [bookPage, setbookPage] = useState(client?.bookPage || 0)

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      return { name, phone, email, bookPage }
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
        />
        <InputLabelContainer
          type="number"
          text="Phone"
          placeholder="13127959303"
          name="phone"
          css="ml-3"
          inputValue={phone}
          setInputValue={setPhone}
        />
      </div>
      <div className="flex mb-7">
        <InputLabelContainer
          type="text"
          text="Email"
          placeholder="example@example.com"
          name="email"
          css="ml-3"
          inputValue={email}
          setInputValue={setEmail}
        />
        <InputLabelContainer
          type="number"
          text="Book Page"
          placeholder="4"
          name="bookPage"
          css="ml-3"
          inputValue={bookPage}
          setInputValue={setbookPage}
        />
      </div>
      <div className="px-4 py-3 flex justify-around sm:px-6">
        <Button text={buttonText} icon={buttonIcon} />
      </div>
    </Form>
  )
})
