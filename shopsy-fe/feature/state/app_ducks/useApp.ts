import { useAppDispatch } from '..'
import { checkIfIsStoreOwner, setAccessToken as setAccessTokenAction } from './appActions'

interface UseApp {
  checkIfStoreOwner: () => void
  setAccessToken: (getAccessTokenSilently: any) => void
}

export const useApp = (): UseApp => {
  const dispatch = useAppDispatch()

  const checkIfStoreOwner = () => {
    dispatch(checkIfIsStoreOwner())
  }

  const setAccessToken = (getAccessTokenSilently) => {
    dispatch(setAccessTokenAction(getAccessTokenSilently))
  }

  return { checkIfStoreOwner, setAccessToken }
}
