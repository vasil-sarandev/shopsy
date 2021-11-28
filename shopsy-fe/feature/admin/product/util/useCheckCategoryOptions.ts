import { useCallback, useEffect, useState } from 'react'
import { ErrorType, getErrorMessage } from '../../../../shared'
import { ProductService } from '../service'

interface UseCheckCategoryOptionsType {
  isLoading: boolean
  error: ErrorType
}

export const useCheckCategoryOptions = (): UseCheckCategoryOptionsType => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorType>(undefined)

  const refetchData = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      const resp = await ProductService.getCategoryOptions()
      if (resp.data.length === 0) setError({ message: 'Първо трябва да създадете категория.' })
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError(getErrorMessage(e))
    }
  }, [])

  useEffect(() => {
    // initial call
    refetchData()
  }, [refetchData])

  return {
    error,
    isLoading
  }
}
