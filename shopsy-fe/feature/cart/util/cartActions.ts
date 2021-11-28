import { isEqual } from 'lodash'
import { CartProduct, Product } from '../../../shared'

export const getNumberOfProducts = (cart: Array<CartProduct>): number => {
  const productCount = cart.reduce(
    (totalCount, currentProduct) => totalCount + currentProduct.quantity,
    0
  )
  return productCount
}

export const addProductToCart = (
  product: Product,
  cart: Array<CartProduct>
): Array<CartProduct> => {
  // no mutating state directly.
  const cartCopy = [...cart]
  const matchProduct = cartCopy.find((x) => x.product._id === product._id)
  if (matchProduct) {
    matchProduct.quantity += 1
    return cartCopy
  }
  cartCopy.push({
    product,
    quantity: 1,
    price: product.price
  })
  return cartCopy
}

export const decreaseProductQuantity = (
  product: Product,
  cart: Array<CartProduct>
): Array<CartProduct> => {
  // no mutating state directly.
  const cartCopy = [...cart]
  const matchProduct = cartCopy.find((x) => x.product._id === product._id)
  if (matchProduct.quantity === 1) {
    return cartCopy.filter((x) => !isEqual(x, matchProduct))
  }
  matchProduct.quantity -= 1
  return cartCopy
}

export const calculateTotalPrice = (cart: Array<CartProduct>): number => {
  const totalSum = cart.reduce(
    (totalPrice, currentProduct) => totalPrice + currentProduct.quantity * currentProduct.price,
    0
  )
  return totalSum
}
