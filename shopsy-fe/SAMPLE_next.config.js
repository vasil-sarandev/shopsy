const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    api_url: 'http://localhost:3005',
    baseurl_app: 'http://localhost:3000',
    auth0_domain: 'auth0_domain',
    auth0_clientId: 'auth0_clientid',
    auth0_redirectUri: 'http://localhost:3000/admin/dashboard',
    auth0_audience: 'auth0_audience',
    auth0_scope: 'read:current_user read:roles read:users'
  },
  production: {
    api_url: 'https://shopsy-be.herokuapp.com',
    baseurl_app: 'https://shopsy.bg',
    auth0_domain: 'auth0_domain',
    auth0_clientId: 'auth0_clientid',
    auth0_redirectUri: 'http://localhost:3000/admin/dashboard',
    auth0_audience: 'auth0_audience',
    auth0_scope: 'read:current_user read:roles read:users'
  }
}[env]

module.exports = {
  env: {
    logo_url: 'https://shopsy.s3.eu-central-1.amazonaws.com/assets/logo_horizontal_black_new.png',
    facebook_pixel_id: 'FB_PIXEL_ID',
    google_analytics_id: 'GA_ID',
    ...config
  },
  images: {
    domains: [
      'static.takeaway.com',
      'images.ctfassets.net',
      'i.imgur.com',
      'shopsy.s3.eu-central-1.amazonaws.com',
      'shopsy.s3.amazonaws.com',
      'ordercloud.s3.eu-central-1.amazonaws.com'
    ]
  },
  typescript: {
    // ignoreBuildErrors: true
  }
}
