import { OrderProduct } from './OrderProduct'

export type Order = {
  _id: string
  createdAt: string
  slug: string
  totalPrice: number
  delivery: {
    type: string
    price: number
  }
  complete: boolean
  products: Array<OrderProduct>
  details: {
    comment?: string
    name: string
    phoneNumber: string
    address: string
  }
}
