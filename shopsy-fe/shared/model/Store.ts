import { Category } from './Category'

export type StoreTheme = {
  primary: string
  secondary: string
}

type DeliveryType = {
  active: boolean
  price: number
}

export type DeliveryTypes = {
  speedy: DeliveryType
  econt: DeliveryType
  address: DeliveryType
  pickup: DeliveryType
}

export type Store = {
  name: string
  id: string
  logo: string
  style?: string
  slug: string
  announcement?: string
  enableOrders: boolean
  categories: Array<Category>
  theme: StoreTheme
  deliveryTypes: DeliveryTypes
}
