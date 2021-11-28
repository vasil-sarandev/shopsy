/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Page, Store } from '../../../shared'

const API_URL = process.env.api_url
const baseURL_category = `${API_URL}/superAdmin`

interface fetchStoresResponse {
  paging: Page
  items: Array<Store>
}

const fetchStores = (
  pagination: Page,
  filter: string
): Promise<AxiosResponse<fetchStoresResponse>> =>
  axios.post<fetchStoresResponse>(`${baseURL_category}/stores`, { pagination, filter })

export const SuperAdminService = {
  fetchStores
}
