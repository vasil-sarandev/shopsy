import { LogoutOutlined } from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { useSelector } from 'react-redux'
import { Card, Step, Steps } from '../../../../shared'
import { StoreDeliveries, StoreInformation, StorePersonalization } from '../component'
import {
  getCreateStoreLoading,
  getCreateStoreRedirectUrl,
  getValidateFormLoading,
  useCreateStore
} from '../ducks'
import styles from '../styles/main.module.css'

interface Props {}

const LOGO_URL = process.env.logo_url

export const CreateStoreContainer: FC<Props> = () => {
  const [current, setCurrent] = useState(0)
  const validateLoading = useSelector(getValidateFormLoading)
  const createStoreLoading = useSelector(getCreateStoreLoading)
  const [nextDisabled, setNextDisabled] = useState(true)
  const { createStore } = useCreateStore()
  const { logout } = useAuth0()

  // doing this because you can't redirect from redux since next router is not connected to store.
  const router = useRouter()
  const redirectUrl = useSelector(getCreateStoreRedirectUrl)
  useEffect(() => {
    if (redirectUrl) router.push(redirectUrl)
  }, [redirectUrl])

  const STEPS: Array<Step> = [
    { title: 'Детайли', component: <StoreInformation setNextDisabled={setNextDisabled} /> },
    {
      title: 'Персонализация',
      component: <StorePersonalization setNextDisabled={setNextDisabled} />
    },
    {
      title: 'Доставки',
      component: <StoreDeliveries setNextDisabled={setNextDisabled} />
    }
  ]

  return (
    <Div100vh style={{ minHeight: '100rvh', display: 'flex', flexDirection: 'column' }}>
      <div className={styles.container}>
        <div className={styles.stepsContainer}>
          <Card style={{ margin: '0 auto' }}>
            <>
              <div className={styles.header}>
                <div className={styles.logo}>
                  <Image src={LOGO_URL} layout='responsive' width='300px' height='93px' />
                </div>
                <div className={styles.heading}>
                  <h2>Създаване на магазин</h2>
                </div>
                <div
                  className={styles.logout}
                  onClick={() => {
                    logout({ returnTo: process.env.baseurl_app })
                  }}
                >
                  Излез <LogoutOutlined />
                </div>
              </div>
              <Steps
                current={current}
                setCurrent={setCurrent}
                steps={STEPS}
                loading={validateLoading || createStoreLoading}
                nextDisabled={nextDisabled}
                onFinish={createStore}
              />
            </>
          </Card>
        </div>
      </div>
    </Div100vh>
  )
}
