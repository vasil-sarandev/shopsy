/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Product, Store } from '../../../shared'

const API_URL = process.env.api_url
const baseURL_product = `${API_URL}/product`

interface ProductPageDataResponse {
  store: Store
  product: Product
  suggestions: Product[]
}

const getProductPageData = (id: string): Promise<AxiosResponse<ProductPageDataResponse>> =>
  axios.get<ProductPageDataResponse>(`${baseURL_product}/productPage/${id}`)

export const ProductService = {
  getProductPageData
}
