const  validatePhone = (phoneNumber) => {
	let phone = phoneNumber.trim()
	phone = phone.split('').filter(item => item !== '-').join('')
  phone = phone.split('').filter(item => item !== ' ').join('')
	return phone
}

module.exports = validatePhone
