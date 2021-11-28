import { useCallback, useState } from 'react'
import { getErrorMessage, notification } from '../../../../shared'
import { PersonalizationService } from '../service'
import { PersonalizationFormState } from '../util'

interface SubmitProfileType {
  isLoading: boolean
  submitProfile: (data: PersonalizationFormState) => Promise<void>
}

const createUpdateStoreInfo = (data: PersonalizationFormState): FormData => {
  const formData = new FormData()
  // handle cases with no update on images. back end expects either a URL or a file - not the fake object we create to please upload component.
  if (data.logo[0]) {
    if (data.logo[0].url) formData.append('logo', data.logo[0].url)
    else formData.append('logo', data.logo[0])
  }
  formData.append('name', data.name)
  formData.append('slug', data.slug.toLowerCase())
  formData.append(
    'theme',
    JSON.stringify({ primary: data.primaryColor, secondary: data.secondaryColor })
  )
  formData.append('enableOrders', JSON.stringify(data.enableOrders))
  formData.append('deliveryTypes', JSON.stringify(data.deliveryTypes))
  if (data.announcement) formData.append('announcement', data.announcement)

  return formData
}

export const useSubmitProfile = (): SubmitProfileType => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submitProfile = useCallback(async (data: PersonalizationFormState): Promise<void> => {
    setIsLoading(true)
    try {
      await PersonalizationService.submitProfile(createUpdateStoreInfo(data))
      notification.success({ message: 'Промените бяха успешно запазени.' })
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      notification.error(getErrorMessage(e))
    }
  }, [])

  return {
    isLoading,
    submitProfile
  }
}
