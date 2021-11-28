import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { createStoreReducer as createStore, initialStateCreateStore } from '../admin/create-store'
import { categoryReducer as category, initialStateCategory } from '../admin/category'
import { productReducer as product, initialStateProduct } from '../admin/product'
import { storeReducer, initialStateStoreReducer } from '../store'
import { cartReducer as cart, initialStateCart } from '../cart'
import { appReducer as app, initialStateApp } from './app_ducks'

let store

const reducer = combineReducers({
  app,
  admin: combineReducers({ createStore, category, product }),
  store: storeReducer,
  cart
})

const initStore = (preloadedState?) =>
  configureStore({
    reducer: {
      app,
      admin: combineReducers({ createStore, category, product }),
      store: storeReducer,
      cart
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })],
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: true,
    preloadedState
  })

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })
    // Reset the current store
    store = undefined
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store
  return _store
}

export const useStore = (initialState) => {
  const memoizedStore = useMemo(() => initializeStore(initialState), [initialState])
  return memoizedStore
}

export type RootState = ReturnType<typeof reducer>
export const initialStateStore: RootState = {
  app: initialStateApp,
  admin: {
    createStore: initialStateCreateStore,
    category: initialStateCategory,
    product: initialStateProduct
  },
  store: initialStateStoreReducer,
  cart: initialStateCart
}
// useless shit because you can't call store() after typeof
const _ = initStore()
export type AppDispatch = typeof _.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
