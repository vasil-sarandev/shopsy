import Image from 'next/image'
import { FC } from 'react'
import { Product } from '../model'
import { STATIC_ROUTES, toReadablePrice } from '../util'
import { CustomLink } from './Link'

interface ProductListProps {
  products: Array<Product>
}
interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const productLink = {
    as: STATIC_ROUTES.productPage.as.replace('[id]', product._id),
    href: STATIC_ROUTES.productPage.href
  }
  return (
    <>
      <div className='productContainer'>
        <CustomLink as={productLink.as} href={productLink.href}>
          <div className='innerProduct'>
            <Image
              src={product.images[0]}
              width={200}
              height={200}
              layout='responsive'
              alt={product.name}
            />
            <div className='productTitle'>{product.name}</div>
            <div className='productPrice'>{toReadablePrice(product.price)}</div>
          </div>
        </CustomLink>
      </div>
    </>
  )
}

export const ProductsList: FC<ProductListProps> = ({ products }) => {
  const productsList = products.map((x) => <ProductCard product={x} key={x._id} />)
  return (
    <>
      <div className='productListContainer'>{productsList}</div>
      <style jsx global>{`
        .productListContainer {
          display: flex;
          flex-wrap: wrap;
        }
        .productListContainer > div:not(:nth-child(4n)) {
          margin-right: var(--gutter);
        }
        .productListContainer > div {
          flex-basis: calc(25% - 75px / 4);
          margin-bottom: var(--gutter);
        }

        .productListContainer .productTitle {
          margin-top: 5px;
          font-weight: bold;
        }
        .productListContainer .productPrice {
          margin-top: 5px;
          color: var(--font-secondary2);
          font-size: 14px;
        }

        @media screen and (max-width: 768px) {
          .productListContainer > div {
            flex-basis: calc(50% - 12.5px);
          }
          .productListContainer > div:not(:nth-child(4n)) {
            margin-right: 0px;
            margin-bottom: 10px;
          }
          .productListContainer > div:nth-child(2n) {
            margin-left: var(--gutter);
          }
        }
        @media screen and (max-width: 450px) {
          .productListContainer > div {
            flex-basis: 80%;
            margin: 0 auto 10px auto !important;
            margin-bottom: var(--gutter) !important;
          }
          .productListContainer > div:nth-child(2n) {
            margin-left: 0px;
          }
        }
      `}</style>
    </>
  )
}
