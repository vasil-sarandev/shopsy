/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { getErrorMessage, Store } from '../../../../shared'
import { PersonalizationFormState, transformProfileResponse } from '../util'

const API_URL = process.env.api_url
const baseURL_personalize = `${API_URL}/store`

const getPersonalizationProfile = async (): Promise<PersonalizationFormState> => {
  try {
    const resp = await axios.get<Store>(`${baseURL_personalize}/personalization`)
    return transformProfileResponse(resp.data)
  } catch (e) {
    throw new Error(getErrorMessage(e).message)
  }
}

const submitProfile = (object: FormData): Promise<AxiosResponse<void>> =>
  axios.patch<void>(`${baseURL_personalize}`, object)

export const PersonalizationService = {
  getPersonalizationProfile,
  submitProfile
}
