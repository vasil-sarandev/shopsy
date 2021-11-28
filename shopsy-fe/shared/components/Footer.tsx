import { FC } from 'react'
import { STATIC_ROUTES } from '../util'
import { CustomLink } from './Link'

interface Props {
  links?: Array<{ as: string; href: string; label: string }>
}

export const AppFooter: FC<Props> = ({ links = [] }) => {
  const linksEls = links.map((x) => (
    <div className='link' key={x.label}>
      <CustomLink as={x.as} href={x.href}>
        {x.label}
      </CustomLink>
    </div>
  ))
  return (
    <>
      <div className='container'>
        <div className='footer_credits'>
          Powered by
          <CustomLink as={STATIC_ROUTES.homepage.as} href={STATIC_ROUTES.homepage.href}>
            <b>Shopsy</b>
          </CustomLink>
        </div>
        <div className='footer_links'>{linksEls}</div>
      </div>
      <style jsx>{`
        .container {
          border-top: var(--border-default);
          background: #f2f2f2;
          padding: 40px 10px;
        }
        .footer_credits {
          text-align: center;
          color: var(--font-secondary2);
          margin-bottom: var(--gutter);
          display: flex;
          justify-content: center;
        }
        :global(.footer_credits a) {
          color: var(--font-secondary2);
          margin-left: 5px;
        }
        .footer_links {
          display: flex;
          justify-content: center;
        }
        :global(.footer_links div a) {
          color: var(--font-secondary2);
        }
        :global(.footer_links > div:not(:last-child)) {
          margin-right: var(--gutter);
        }

        @media screen and (max-width: 768px) {
          .footer_credits {
            margin-bottom: 10px;
          }
          .footer_links {
            flex-direction: column;
            text-align: center;
          }
          :global(.footer_links > div:not(:last-child)) {
            margin-right: unset;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  )
}
