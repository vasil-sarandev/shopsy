/* eslint-disable camelcase */
declare const window: any

export const GA_TRACKING_ID = process.env.google_analytics_id

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const ga_pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const ga_event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })
}
