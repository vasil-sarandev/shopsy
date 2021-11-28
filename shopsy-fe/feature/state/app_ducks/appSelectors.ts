import { RootState } from '..'

export const getAppIsStoreOwnerLoading = (state: RootState): boolean =>
  state.app.isStoreOwnerLoading
export const getAppIsStoreOwner = (state: RootState): boolean => state.app.isStoreOwner
export const getStoreId = (state: RootState): string => state.app.storeId
export const getAppAccessToken = (state: RootState): string => state.app.accessToken
export const getAppIsAccessTokenLoading = (state: RootState): boolean =>
  state.app.isAccessTokenLoading
