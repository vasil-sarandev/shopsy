/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../../shared'
import { checkIfUserIsStoreOwner, StoreOwnerResponse } from './service'

export const checkIfIsStoreOwner = createAsyncThunk(
  'app/checkIfIsStoreOwner',
  async (): Promise<StoreOwnerResponse> => {
    const resp = await checkIfUserIsStoreOwner()
    return resp
  }
)

export const setAccessToken = createAsyncThunk(
  'app/setAccessToken',
  async (getAccessTokenSilently: any): Promise<string> => {
    try {
      // introducing a timeout because adblocker makes getAccessTokenSilently fail.
      const auth0_audience = process.env.auth0_audience
      const accessToken = await getAccessTokenSilently({
        audience: auth0_audience,
        scope: 'read:current_user',
        timeoutInSeconds: 2
      })
      return accessToken
    } catch (e) {
      if (e.message === 'Login required') {
        throw new Error('Трябва да влезете в профила си.')
      }
      throw new Error(getErrorMessage(e).message)
    }
  }
)
