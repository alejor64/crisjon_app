//API
export const API_URL = import.meta.env.VITE_URL_API || 'http://localhost:3000';

//AUTH_SLICE
export const NOT_AUTHENTICATED = 'not-authenticated'
export const AUTHENTICATED = 'authenticated'
export const CHECKING = 'checking'

//LOCAL_STORAGE
export const TOKEN = 'crisjon_token'
export const CLIENTS = 'client'
export const ORDERS = 'order'
export const USERS = 'user'
export const SERVICES = 'service'
export const ITEMS = 'item'
export const ESTIMATED_PRICES = 'estimatedPrices'
export const GOLDEN_PRICE = 'XAU'

//TABEL
export const ROW_TO_TABLE = 15

//DATE FORMAT
export const USA_DATE_FORMAT = 'MM-DD-YYYY'
export const DATA_PICKER_FORMAT = 'YYYY-MM-DD'
export const MONTH = 'month'

//ROLES
export const ADMIN = 'ADMIN'
export const USER = 'USER'