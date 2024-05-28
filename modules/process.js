require('dotenv').config()

console.log('id запущенного процесса', process.pid)
console.log('переменные окружения', process.env)
console.log('переменная из .env файла', process.env.PORT)
console.log('аргументы переданные в команде', process.argv)

//process.exit() - останавливает исполнение программы
