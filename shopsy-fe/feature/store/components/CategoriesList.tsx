import Image from 'next/image'
import { FC } from 'react'
import { Category, CustomLink, Slider, STATIC_ROUTES } from '../../../shared'
import styles from '../styles/categories.module.css'

interface Props {
  categories: Array<Category>
}

export const CategoriesList: FC<Props> = ({ categories }) => {
  const categorySlides = categories.map((x) => {
    const imageURL = x.image ?? x.products[0].images[0]
    const categoryLink = {
      as: STATIC_ROUTES.categoryPage.as.replace('[id]', x._id),
      href: STATIC_ROUTES.categoryPage.href
    }
    return (
      <CustomLink as={categoryLink.as} href={categoryLink.href}>
        <div className={styles.categorySlide} key={x._id}>
          <div className={styles.categoryImage}>
            <Image layout='responsive' height={100} width={100} src={imageURL} alt={x.title} />
          </div>
          <div className={styles.categoryTitle}>
            {x.title}({x.products.length})
          </div>
        </div>
      </CustomLink>
    )
  })

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.desktop}>
        <Slider
          key='large'
          slidesPerView={5}
          loop={false}
          slides={categorySlides}
          showNavigation={false}
          spacing={24}
        />
      </div>
      <div className={styles.mobile}>
        <Slider
          key='mobile'
          slidesPerView={3}
          loop={false}
          slides={categorySlides}
          showNavigation={false}
          spacing={24}
        />
      </div>
      <div className={styles.smallMobile}>
        <Slider
          key='smallMobile'
          slidesPerView={1}
          loop={false}
          slides={categorySlides}
          showNavigation={false}
          spacing={24}
        />
      </div>
    </div>
  )
}
