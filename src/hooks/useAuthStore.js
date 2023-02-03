import { useDispatch, useSelector } from 'react-redux'
import { startLoginWithEmailAndPassword, startLoginWithToken, startLogout } from '../store/auth/thunks'
import { TOKEN } from '../utils/constants'

export const useAuthStore = () => {
  const { status, name, role, token, errorMessages } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({userEmail, userPassword}) => {
    dispatch(startLoginWithEmailAndPassword({userEmail, userPassword}))
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem(TOKEN)
    dispatch(startLoginWithToken(token))
  }

  const logout = async () => {
    dispatch(startLogout())
  }

  return {
    status,
    name,
    role,
    token,
    errorMessages,
    startLogin,
    checkAuthToken,
    logout,
  }
}
