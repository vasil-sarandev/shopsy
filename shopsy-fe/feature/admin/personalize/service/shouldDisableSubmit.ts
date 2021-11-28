import { isEmpty, isEqual } from 'lodash'
import { ValidateInformationErrors } from '../../create-store'
import { PersonalizationFormState } from '../util'

export const shouldDisableSubmitPersonalizeForm = (
  formState: PersonalizationFormState,
  validationErrors: ValidateInformationErrors,
  initialData: PersonalizationFormState
): boolean => {
  if (
    !isEmpty(validationErrors.name) ||
    !isEmpty(validationErrors.slug) ||
    isEqual(formState, initialData) ||
    isEmpty(formState.name) ||
    isEmpty(formState.slug) ||
    isEmpty(formState.primaryColor) ||
    isEmpty(formState.secondaryColor) ||
    (!formState.deliveryTypes.address.price && formState.deliveryTypes.address.price !== 0) ||
    (!formState.deliveryTypes.speedy.price && formState.deliveryTypes.speedy.price !== 0) ||
    (!formState.deliveryTypes.econt.price && formState.deliveryTypes.econt.price !== 0) ||
    (!formState.deliveryTypes.pickup.price && formState.deliveryTypes.pickup.price !== 0)
  )
    return true
  return false
}
