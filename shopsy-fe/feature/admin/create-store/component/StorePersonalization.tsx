import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ColorPicker, Upload } from '../../../../shared'
import { getCreateStoreFormState, useCreateStore } from '../ducks'
import styles from '../styles/main.module.css'

interface Props {
  setNextDisabled: (boolean) => void
}

export const StorePersonalization: FC<Props> = ({ setNextDisabled }) => {
  const formState = useSelector(getCreateStoreFormState)
  const { setFormField } = useCreateStore()
  useEffect(() => {
    // logo no longer required.
    const enableNext = true
    setNextDisabled(!enableNext)
  }, [formState])

  return (
    <div className={styles.personalizationWrapper}>
      <ColorPicker
        label='Основен цвят'
        value={formState.primaryColor}
        onChange={setFormField}
        name='primaryColor'
      />
      <ColorPicker
        label='Вторичен цвят'
        value={formState.secondaryColor}
        onChange={setFormField}
        name='secondaryColor'
      />
      <div className={styles.inputHelp}>
        Основен цвят е цветът за бутони и заглавия в магазина ви, а вторичният е за акценти.
      </div>

      <Upload
        name='logo'
        onChange={setFormField}
        value={formState.logo}
        aspect={1 / 1}
        label='Logo'
      />
    </div>
  )
}
