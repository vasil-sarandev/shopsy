import { DeliveryTypes, Store } from '../../../../shared'

export type PersonalizationFormState = {
  logo: Array<any>
  name: string
  slug: string
  announcement?: string
  enableOrders: boolean
  primaryColor: string
  secondaryColor: string
  deliveryTypes: DeliveryTypes
}

export const transformProfileResponse = (data: Store): PersonalizationFormState => {
  const transformedLogo = [
    {
      uid: '0',
      name: 'image.png',
      status: 'done',
      url: data.logo
    }
  ]
  const { primary, secondary } = data.theme
  return {
    ...data,
    primaryColor: primary,
    secondaryColor: secondary,
    logo: transformedLogo
  }
}
