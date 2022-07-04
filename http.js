const axios = require('axios')
const fakeUa = require('fake-useragent');

const $api = axios.create({
	headers: {'User-Agent': fakeUa()}
})

module.exports = $api
