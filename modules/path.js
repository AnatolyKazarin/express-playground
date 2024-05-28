const path = require('path')

console.log('Склеивает путь вне зависимости от ос', path.join(__dirname, '..', 'package.json'))
console.log('Получаем абсолютный путь', path.resolve('first', 'second'))

const curPath = path.resolve(__dirname, 'path.js')
console.log('Парсинг пути', path.parse(curPath))

console.log('Разделитель в ОС', path.sep)
console.log('Проверка на абсолютный путь', path.isAbsolute('first/second'))
console.log('Название файла', path.basename(curPath))
console.log('Расширение файла',path.extname(curPath))

const url = new URL('https://google.com:3000/users?id=1')
console.log('Класс URL для парса ссылок', url)
