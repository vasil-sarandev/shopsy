import { ProductFormState } from '../ducks'

export const transformProductResponse = (data: any): ProductFormState => {
  const transformedImages = []
  data.images.forEach((image, index) =>
    transformedImages.push({
      uid: index.toString(),
      name: `image${index}.png`,
      status: 'done',
      url: image,
      thumbUrl: image
    })
  )
  return {
    ...data,
    images: transformedImages
  }
}
