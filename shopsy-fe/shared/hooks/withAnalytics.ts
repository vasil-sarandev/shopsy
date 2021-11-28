import { useEffect } from 'react'
import { useRouter } from 'next/router'
// eslint-disable-next-line camelcase
import { fb_pageview, ga_pageview } from '../util'

const handleRouteChange = (url) => {
  fb_pageview()
  ga_pageview(url)
}

const WithAnalytics = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    // This pageview only trigger first time (it is important for Pixel to have real information)
    fb_pageview()
    ga_pageview(router.asPath)

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return children
}

export default WithAnalytics
