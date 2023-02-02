import { useState } from 'react'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { Button, Form, InputLabelContainer } from "../../components/form"

export const LoginPage = () => {
  const [show, setShow] = useState(false)
  const onClick = () => {
    setShow(!show)
  }
  return (
    <div className="container p-4 bg-slate-200 min-h-screen min-w-full flex flex-row justify-center items-center">
      <div className="basis-11/12 md:basis-1/3">
        <div className="flex flex-col items-center">
          <img
            src="https://crisjon.com/img/Nav/L1%20with%20nb3.png"
            alt="crisjon logo"
            className="w-[150px]"
          />
          <h2 className='text-center text-2xl my-5'>Welcome to Crisjon Admin</h2>
        </div>
        <Form title="Login">
          <div className="flex mb-7">
            <InputLabelContainer
              type="email"
              text="Email address"
              placeholder="example@email.com"
              name="email-address"
            />
          </div>
          <div className="flex mb-7">
            <InputLabelContainer
              type={show ? "text" : "password"}
              text="Password"
              placeholder="password"
              name="password"
            />
          </div>
          <div className="flex mb-7">
            <input type="checkbox" id="show-passwprd" checked={show} onChange={onClick} />
            <span className='ml-1'>Show password</span>
          </div>
          <div className="px-4 py-3 text-center sm:px-6">
            <Button text="Submit" icon={faPaperPlane} />
          </div>
        </Form>
      </div>
    </div>
  )
}
