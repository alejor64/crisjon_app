import { faUser, faAddressCard, faCreditCard, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons'
import { ADMIN, USER } from '../../../utils/constants'

export const navigation = (role = USER) => {
  const tabs = [
    { name: 'Clients', route: '/client', icon: faAddressCard },
    { name: 'Order', route: '/order', icon: faCreditCard },
    // { name: 'Estimate', route: '/estimate', icon: faMoneyBill1 },
    { name: 'Users', route: '/user', icon: faUser },
    { name: 'Invoice', route: '/invoice', icon: faMoneyBill1 }
  ]

  return tabs
}