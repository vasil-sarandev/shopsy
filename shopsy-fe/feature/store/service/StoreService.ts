/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Category, Product, Store } from '../../../shared'

const API_URL = process.env.api_url
const baseURL_store = `${API_URL}/store`

interface StorePageDataResponse {
  store: Store
  categories: Array<Category>
  products: Array<Product>
}

const getStorePageData = (slug: string): Promise<AxiosResponse<StorePageDataResponse>> =>
  axios.get<StorePageDataResponse>(`${baseURL_store}/storePage/${slug}`)

export const StoreService = {
  getStorePageData
}
