import { useRouter } from 'next/router'
import { ComponentType, FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PageLoader, STATIC_ROUTES } from '../../../shared'
import { getAppIsStoreOwner, getAppIsStoreOwnerLoading, useApp } from '../../state/app_ducks'

interface Props {}

export const withStoreOwner = (Component: ComponentType): FC<Props> => (props) => {
  const router = useRouter()
  const { checkIfStoreOwner } = useApp()
  const loading = useSelector(getAppIsStoreOwnerLoading)
  const isStoreOwner = useSelector(getAppIsStoreOwner)

  useEffect(() => {
    if (!isStoreOwner) checkIfStoreOwner()
  }, [])

  if (loading) return <PageLoader />
  if (isStoreOwner === false) {
    router.push(STATIC_ROUTES.createStore.as)
  }
  if (isStoreOwner) return <Component {...props} />

  return <PageLoader />
}
