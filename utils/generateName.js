const nameList = require('./nameList')

const generateName = () => {
	item = Math.round(Math.random(0, nameList.length - 1) * 100)
	return nameList[item]
}

module.exports = generateName
