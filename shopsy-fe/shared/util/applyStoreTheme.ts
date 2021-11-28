import { StoreTheme } from '../model'

export const applyStoreTheme = (theme: StoreTheme): void => {
  const root: HTMLElement = document.querySelector(':root')
  const rootStyle = root.style
  rootStyle.setProperty('--primary', theme.primary)
  rootStyle.setProperty('--secondary', theme.secondary)
}
