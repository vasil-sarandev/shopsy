/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { FB_PIXEL_ID, GA_TRACKING_ID } from '../shared'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* google analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          {/* Global Site Code Pixel - Facebook Pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // google analytics
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
                //facebook pixel
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});

                //google analytics
                
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
