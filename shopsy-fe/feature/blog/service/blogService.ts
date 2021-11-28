/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { BlogPost } from '../model'

const API_URL = process.env.api_url
const baseURL_BLOG = `${API_URL}/blog`

const getSlugs = (): Promise<AxiosResponse<string[]>> =>
  axios.get<string[]>(`${baseURL_BLOG}/slugs`)

const getPosts = (): Promise<AxiosResponse<BlogPost[]>> =>
  axios.get<BlogPost[]>(`${baseURL_BLOG}/posts`)

const getPostBySlug = (slug: string): Promise<AxiosResponse<BlogPost>> =>
  axios.get<BlogPost>(`${baseURL_BLOG}/post/${slug}`)

export const BlogService = {
  getSlugs,
  getPosts,
  getPostBySlug
}
