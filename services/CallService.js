const FormData = require('form-data')
const axios = require('axios')
const $api = require('../http')

const getTime = () => {
	if (new Date().getHours() < 13) {
		return [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, `${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}%3A00`]
	} else {
		return [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`, '08%3A00']
	}
}

const getDate = () => {
	return `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
}

class CallService {
	call () {
		return new Promise(async (resolve, reject) => {
			try {
				let formData = new FormData()

				formData.append('wpforms[fields][3]', '190100193845')
				formData.append('wpforms[fields][6]', 'Федулов Андрей Александрович')
				formData.append('wpforms[fields][10]', 'Мне крайне необходимо получить эти деньги чтобы оплатить аренду помещения для моего бизнеса.')
				formData.append('wpforms[fields][8]', '10000')
				formData.append('wpforms[fields][0]', 'Андрей')
				formData.append('wpforms[fields][9]', '79811641799')
				formData.append('wpforms[fields][13]', 'fedulov2006@yandex.ru')
				formData.append('wpforms[fields][11][]', 'Нажимая кнопку "Отправить", я соглашаюсь на обработку персональных данных')
				formData.append('wpforms[fields][id]', '1173')
				formData.append('wpforms[fields][author]', '3')
				formData.append('wpforms[fields][post_id]', '1155')
				formData.append('wpforms[fields][submit]', 'wpforms-submit')
				formData.append('wpforms[fields][token]', '96c57d05a349215e31c196f326b62564')
				const headers = formData.getHeaders()

				await axios
					.post('https://fondrh.ru/form/', formData, {headers})
					.then(resolve())
					.catch(err => console.log(err))
			} catch (err) {
				reject(err)
			}
		})
	}

	call2 () {
		return new Promise(async (resolve, reject) => {
			try {
				let formData1 = new FormData()
				let formData2 = new FormData()

				formData1.append('phone', '+7(981) 164 17 99')
				formData1.append('name', 'Федулов Андрей Александрович')
				formData1.append('namedoctor', 'Крылов Михаил Сергеевич')
				formData1.append('time', getDate())
				formData1.append('url', 'www.spik.ru/uslugi/plastic-surgery/mammaplasty/augmentation/')
				formData1.append('procedur', 'Увеличение груди')
				formData1.append('modal', 'zapis')
				const headers1 = formData1.getHeaders()

				formData2.append('your-phone', '79811641799')
				formData2.append('your-name', 'Андрей Александрович')
				formData2.append('your-type', 'Мужская косметология')
				const headers2 = formData2.getHeaders()

				await $api
					.get(`https://whitesaas.com/api?action=calldeferred&callback=jWS21406521840218929245_1652219585808&phone=79811641799&department=%D0%91%D0%B5%D1%81%D1%82%D1%83%D0%B6%D0%B5%D0%B2%D0%B0+22%D0%B1&phoneMask=%2B_(___)___-__-__&shownOn=onshow&url=https%3A%2F%2Fplasteksurgery.ru%2Fservices%2Fplastic-surgery%2Fbreast%2F&code=582f86c8f7679580f7df1e1fca82adb3&visitorId=10074334871&visitId=17429139953&hourDelta=-7&date=${getTime()[0]}&time=${getTime()[1]}`)
					.then(resolve())
					.catch(err => console.log(err))

				await axios
					.post('https://www.spik.ru/local/ajax/callback.php', formData1, {headers1})
					.then(resolve())
					.catch(err => console.log(err))

				await axios
					.post('https://www.wellnessclinic.ru/wp-json/contact-form-7/v1/contact-forms/134/feedback', formData2, {headers2})
					.then(resolve())
					.catch(err => console.log(err))
			} catch (err) {
				reject(err)
			}
		})
	}
}

module.exports = new CallService()
