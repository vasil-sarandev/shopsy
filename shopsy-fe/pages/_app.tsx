import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import NextNprogress from 'nextjs-progressbar'
import { Auth0Provider } from '../feature/auth'
import { useStore } from '../feature/state'
import { useRouterScroll } from '../shared'
import { useAxiosInterceptors } from '../shared/util'
import '../shared/util/global.css'
import WithAnalytics from '../shared/hooks/withAnalytics'

useAxiosInterceptors()

// add facebook pixel and google analytics

const App = ({ Component, pageProps }: AppProps) => {
  useRouterScroll()
  return (
    <Provider store={useStore(pageProps.initialReduxState)}>
      <Auth0Provider>
        <WithAnalytics>
          <NextNprogress color='#29D' startPosition={0.3} stopDelayMs={200} height={3} />
          <Component {...pageProps} />
        </WithAnalytics>
      </Auth0Provider>
    </Provider>
  )
}

export default App
