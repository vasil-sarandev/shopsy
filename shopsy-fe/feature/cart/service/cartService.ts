/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { CreateOrderObject } from '../util/createOrderInfo'

const API_URL = process.env.api_url
const baseURL_ORDER = `${API_URL}/order`

const createOrder = (order: CreateOrderObject): Promise<AxiosResponse<string>> =>
  axios.post<string>(`${baseURL_ORDER}`, order)

export const CartService = {
  createOrder
}
