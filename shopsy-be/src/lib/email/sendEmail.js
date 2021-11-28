const request = require('request')
const util = require('util')
const requestPromise = util.promisify(request)
const sgMail = require('@sendgrid/mail')
// eslint-disable-next-line no-undef
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMailToUserId = async (user_id) => {
    try {
        var options = {
            method: 'POST',
            url: 'https://shopsy.eu.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: '{"client_id":"xXaSugnNj7ffOd47FIIJhmWEgr6pcDEZ","client_secret":"QxvIvIGG4niivK0XuG81v4sMxlviaYW3YdzawmLHZS3TsLIj5dj4ospDKhRww09V","audience":"https://shopsy.eu.auth0.com/api/v2/","grant_type":"client_credentials"}'
        }
        const tokenResp = await requestPromise(options)
        const token = JSON.parse(tokenResp.body).access_token
        const userResponse = await requestPromise({
            url: `https://shopsy.eu.auth0.com/api/v2/users/${user_id}`,
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        const { email } = JSON.parse(userResponse.body)
        await sendMail(email)
    } catch (e) {
        console.log('error', e)
    }
}


const sendMail = async (email) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'shopsybg@gmail.com', // Change to your verified sender
        subject: 'Имате нова поръчка!',
        text: 'Проверете я в административния панел.',
        html: '<h1>Получихте нова поръчка.</h1><p><a href="https://shopsy.bg/admin/dashboard">Проверете я!</a></p>'
    }
    try {
        await sgMail.send(msg)
    } catch (e) {
        throw new Error(e.message)
    }

}
module.exports = {
    sendMailToUserId
}