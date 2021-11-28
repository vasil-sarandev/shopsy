/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Category, Store } from '../../../shared'

const API_URL = process.env.api_url
const baseURL_category = `${API_URL}/category`

interface CategoryPageDataResponse {
  store: Store
  category: Category
}

const getCategoryPageData = (id: string): Promise<AxiosResponse<CategoryPageDataResponse>> =>
  axios.get<CategoryPageDataResponse>(`${baseURL_category}/categoryPage/${id}`)

export const CategoryService = {
  getCategoryPageData
}
