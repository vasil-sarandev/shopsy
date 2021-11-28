import { FC } from 'react'
import { Header, HeroBanner, Footer, FirstSection, SecondSection, ThirdSection } from '../sections'
import styles from '../styles/container.module.css'

interface Props {}

export const HomepageContainer: FC<Props> = () => (
  <div className={styles.container}>
    <Header />
    <HeroBanner />
    <FirstSection />
    <SecondSection />
    <ThirdSection />
    <Footer />
  </div>
)
