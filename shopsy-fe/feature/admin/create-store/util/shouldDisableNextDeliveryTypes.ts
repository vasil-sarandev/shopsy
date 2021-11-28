import { CreateStoreFormState } from '../ducks'

export const shouldDisableNextDeliveryTypes = (data: CreateStoreFormState): boolean => {
  let shouldDisable = false
  const { deliveryTypes } = data

  // no need to verify if they're not acceping orders.
  if (data.enableOrders === false) return false

  if (
    data.enableOrders &&
    !deliveryTypes.speedy.active &&
    !deliveryTypes.address.active &&
    !deliveryTypes.econt.active &&
    !deliveryTypes.pickup.active
  )
    return true

  if (
    deliveryTypes.address.active &&
    !deliveryTypes.address.price &&
    deliveryTypes.address.price !== 0
  )
    shouldDisable = true

  if (
    deliveryTypes.speedy.active &&
    !deliveryTypes.speedy.price &&
    deliveryTypes.speedy.price !== 0
  )
    shouldDisable = true

  if (deliveryTypes.econt.active && !deliveryTypes.econt.price && deliveryTypes.econt.price !== 0)
    shouldDisable = true

  if (
    deliveryTypes.pickup.active &&
    !deliveryTypes.pickup.price &&
    deliveryTypes.pickup.price !== 0
  )
    shouldDisable = true

  return shouldDisable
}
