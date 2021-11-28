import { CreateStoreFormState } from '../ducks'

export const createStoreInfo = (data: CreateStoreFormState): FormData => {
  const formData = new FormData()
  if (data.logo[0]) formData.append('logo', data.logo[0])
  formData.append('enableOrders', JSON.stringify(data.enableOrders))
  if (data.enableOrders) formData.append('deliveryTypes', JSON.stringify(data.deliveryTypes))

  formData.append('name', data.name)
  formData.append('slug', data.slug.toLowerCase())
  formData.append(
    'theme',
    JSON.stringify({ primary: data.primaryColor, secondary: data.secondaryColor })
  )
  return formData
}
