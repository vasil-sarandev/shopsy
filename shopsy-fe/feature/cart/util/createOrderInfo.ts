import { OrderProduct } from '../../../shared/model/OrderProduct'
import { RootState } from '../../state'
import { calculateTotalPrice } from './cartActions'
import { mappedDeliveryTypes } from './mappedDeliveryTypes'

export interface CreateOrderObject {
  slug: string
  totalPrice: number
  products: Array<OrderProduct>
  delivery: {
    type: string
    price: number
  }
  details: {
    comment?: string
    name: string
    phoneNumber: string
    address: string
  }
}

export const createOrderInfo = (state: RootState): CreateOrderObject => {
  const { cart, store } = state
  const { slug } = store.store
  const deliveryType = cart.formState.deliveryType.value
  const deliveryPrice = store.store.deliveryTypes[mappedDeliveryTypes[deliveryType]].price
  const totalPrice = calculateTotalPrice(cart.cart)
  const { comment, name, phoneNumber, address } = state.cart.formState
  const products = cart.cart.map((x) => ({
    quantity: x.quantity,
    price: x.price,
    product: { id: x.product._id, name: x.product.name, image: x.product.images[0] }
  }))

  const order = {
    slug,
    totalPrice,
    delivery: {
      price: deliveryPrice,
      type: deliveryType
    },
    products,
    details: {
      comment,
      name,
      phoneNumber,
      address
    }
  }
  return order
}
