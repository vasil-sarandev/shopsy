/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { debounce, isEmpty } from 'lodash'
import validator from 'validator'
import { getErrorMessage } from '../../../../shared'
import { notification } from '../../../../shared/components'
import { CreateStoreFormState } from '../ducks'

const API_URL = process.env.api_url
const baseURL_store = `${API_URL}/store`

const checkIfNameAvailable = (name: string): Promise<AxiosResponse<boolean>> =>
  axios.post<boolean>(`${baseURL_store}/available/name`, { name })

const checkIfSlugAvailable = (slug: string): Promise<AxiosResponse<boolean>> =>
  axios.post<boolean>(`${baseURL_store}/available/slug`, { slug })

const createStore = (object: FormData): Promise<void> => axios.post(`${baseURL_store}`, object)

const validateForm = async (
  formState: CreateStoreFormState,
  setValidationError,
  setValidateFormLoading,
  initialValues: any = {}
) => {
  const { name, slug } = formState
  if (isEmpty(initialValues) || name !== initialValues.name) {
    if (name) {
      let error = ''
      if (name.trim().length < 4) {
        error = 'Името трябва да е по-дълго от 4 символа.'
      } else if (name.trim().length > 30) {
        error = 'Името трябва да е по-късо от 30 символа.'
      } else {
        try {
          const available = (await checkIfNameAvailable(name.trim())).data
          if (available === false)
            error = 'Името вече е заето. Ако ресторантът с това име е ваш, свържете се с нас.'
        } catch (e) {
          error = getErrorMessage(e).message
          notification.error({
            message:
              'Възникна грешка при проверка дали името е свободно. Моля опитайте отново или по-късно.',
            duration: 10
          })
        }
      }
      setValidationError('name', error)
    } else {
      setValidationError('name', '')
    }
  } else setValidationError('name', '')
  if (isEmpty(initialValues) || slug !== initialValues.slug) {
    if (slug) {
      const regex = new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      let error = ''
      if (!validator.isSlug(slug.trim())) {
        error =
          'Идентификаторът е в неправилен формат. Примери за правилен формат: starbucks, starbucks-paradise и т.н.'
      } else if (slug.trim().length < 4) {
        error = 'Идентификаторът трябва да е по-дълъг от 4 символа.'
      } else if (slug.trim().length > 20) {
        error = 'Идентификаторът трябва да е по-къс от 20 символа.'
      } else if (!regex.test(slug.trim().toLowerCase())) {
        error = 'Идентификаторът може да съдържа само латински букви, числа и тире.'
      } else {
        try {
          const available = (await checkIfSlugAvailable(slug.trim())).data
          if (available === false) error = 'Идентификаторът вече е зает.'
        } catch (e) {
          error = getErrorMessage(e).message
          notification.error({
            message:
              'Възникна грешка при проверка дали идентификаторът е свободен. Моля опитайте отново или по-късно.',
            duration: 10
          })
        }
      }
      setValidationError('slug', error)
    } else {
      setValidationError('slug', '')
    }
  } else setValidationError('slug', '')
  setValidateFormLoading(false)
}

export const CreateStoreService = {
  validateForm: debounce(validateForm, 500),
  createStore
}
