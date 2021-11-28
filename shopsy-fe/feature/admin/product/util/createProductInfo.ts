import { ProductFormState } from '../ducks'

export const createProductInfo = (data: ProductFormState): FormData => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('price', data.price.toString())
  formData.append('quantity', data.quantity)
  formData.append('category', data.category.value)
  formData.append('featured', JSON.stringify(data.featured))
  if (data.description) formData.append('description', data.description)
  data.images.forEach((image) => {
    if (image.url) formData.append('images', image.url)
    else formData.append('images', image)
  })
  return formData
}
