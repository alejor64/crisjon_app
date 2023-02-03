import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { Button, Form, InputLabelContainer } from "../../components/form"
import { startLoginWithEmailAndPassword } from '../../store/auth/thunks'
import { CHECKING } from '../../utils/constants'
import { useAuthStore } from '../../hooks'

export const LoginPage = () => {
  const { startLogin } = useAuthStore()
  const [show, setShow] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const { status, errorMessages } = useSelector( state => state.auth )
  const isAuthenticated = useMemo(() => status === CHECKING, [status])
  const dispatch = useDispatch()

  const onClick = () => {
    setShow(!show)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    startLogin({userEmail, userPassword})
  }

  return (
    <div className="container p-4 bg-slate-200 min-h-screen min-w-full flex flex-row justify-center items-center">
      <div className="basis-11/12 md:basis-1/3 bg-white pt-5">
        <div className="flex flex-col items-center">
          <img
            src="https://crisjon.com/img/Nav/L1%20with%20nb3.png"
            alt="crisjon logo"
            className="w-[150px]"
          />
          <h2 className='text-center text-2xl my-5'>Welcome to Crisjon Admin</h2>
        </div>
        <Form title="Login" onSubmit={onSubmit}>
          <div className="flex mb-7">
            <InputLabelContainer
              type="email"
              text="Email address"
              placeholder="example@email.com"
              name="email-address"
              inputValue={userEmail}
              setInputValue={setUserEmail}
            />
          </div>
          <div className="flex mb-7">
            <InputLabelContainer
              type={show ? "text" : "password"}
              text="Password"
              placeholder="password"
              name="password"
              inputValue={userPassword}
              setInputValue={setUserPassword}
            />
          </div>
          <div className="flex mb-7">
            <input type="checkbox" id="show-passwprd" checked={show} onChange={onClick} />
            <span className='ml-1'>Show password</span>
          </div>
          {
            errorMessages &&
              <div className='flex mb-2 justify-center'>
                <p className='text-red-500'>{errorMessages}</p>
              </div>
          }
          <div className="px-4 py-3 text-center sm:px-6">
            <Button
              text="submit"
              icon={faPaperPlane}
              disabled={isAuthenticated}
            />
          </div>
        </Form>
      </div>
    </div>
  )
}
