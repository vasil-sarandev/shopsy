import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notification } from '../../../shared/components'
import { checkIfIsStoreOwner, setAccessToken } from './appActions'

export interface AppReducerState {
  isStoreOwner: boolean
  isStoreOwnerLoading: boolean
  storeId: string
  accessToken: string
  isAccessTokenLoading: boolean
}

const initialState: AppReducerState = {
  isStoreOwner: null,
  isStoreOwnerLoading: false,
  storeId: null,
  accessToken: null,
  isAccessTokenLoading: true
}
export { initialState as initialStateApp }

export const { reducer: appReducer, actions: appActions } = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // check if is store owner
    builder.addCase(checkIfIsStoreOwner.pending, (state) => {
      state.isStoreOwnerLoading = true
    })
    builder.addCase(checkIfIsStoreOwner.fulfilled, (state, { payload }) => {
      state.isStoreOwner = payload.isStoreOwner
      state.storeId = payload.storeId
      state.isStoreOwnerLoading = false
    })
    builder.addCase(checkIfIsStoreOwner.rejected, (state) => {
      notification.error({
        message: 'An unexpected problem has occured. Please try again later.'
      })
      // dont stop the loading state. no point in letting users continue.
      // state.isStoreOwnerLoading = false
      state.isStoreOwner = false
    })

    // set access token
    builder.addCase(setAccessToken.pending, (state) => {
      state.isAccessTokenLoading = true
    })
    builder.addCase(setAccessToken.fulfilled, (state, { payload }) => {
      axios.defaults.headers.common = { Authorization: `Bearer ${payload}` }
      state.accessToken = payload
      state.isAccessTokenLoading = false
    })
    builder.addCase(setAccessToken.rejected, (state, { error }) => {
      const message = error.message || 'An unexpected problem has occured. Please try again later.'
      notification.error({
        message
      })
      // dont stop the loading state. no point in letting users continue.
      state.isAccessTokenLoading = false
      state.accessToken = null
    })
  }
})
