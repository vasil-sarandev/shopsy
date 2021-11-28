import axios from 'axios'

const API_URL = process.env.api_url
const endpointURL = `${API_URL}/store/mine`

export interface StoreOwnerResponse {
  isStoreOwner: boolean
  storeId?: string
}

export const checkIfUserIsStoreOwner = async (): Promise<StoreOwnerResponse> => {
  const resp = (await axios.get<StoreOwnerResponse>(`${endpointURL}`)).data
  return resp
}
