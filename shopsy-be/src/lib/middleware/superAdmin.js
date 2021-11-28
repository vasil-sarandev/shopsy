const request = require('request')
const util = require('util')
const requestPromise = util.promisify(request)

const superAdminRoleName = 'admin'

const superAdmin = async (req, res, next) => {
    try {
        var options = {
            method: 'POST',
            url: 'https://shopsy.eu.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: '{"client_id":"xXaSugnNj7ffOd47FIIJhmWEgr6pcDEZ","client_secret":"QxvIvIGG4niivK0XuG81v4sMxlviaYW3YdzawmLHZS3TsLIj5dj4ospDKhRww09V","audience":"https://shopsy.eu.auth0.com/api/v2/","grant_type":"client_credentials"}'
        }
        const tokenResp = await requestPromise(options)
        const token = JSON.parse(tokenResp.body).access_token

        const user_id = req.user.sub
        const rolesResponse = await requestPromise({
            url: `https://shopsy.eu.auth0.com/api/v2/users/${user_id}/roles`,
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        const roles = JSON.parse(rolesResponse.body)
        if (!roles.map(roles => roles.name).find(role => role === superAdminRoleName)) {
            throw new Error()
        }

        next()
    } catch (e) {
        console.log('error', e)
        res.status(401).send({ message: 'Unauthorized.' })
    }
}
module.exports = superAdmin

