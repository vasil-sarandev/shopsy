/* eslint-disable camelcase */
declare const window: any

export const FB_PIXEL_ID = process.env.facebook_pixel_id

export const fb_pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const fb_event = (name, options = {}) => {
  window.fbq('track', name, options)
}
