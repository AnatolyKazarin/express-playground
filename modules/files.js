require('dotenv').config()
const fs = require('fs')
const path = require('path')

// Создать папку синхронно, блокируя поток
// fs.mkdirSync(path.resolve(__dirname, 'folder'))
//
// Создать папку асинхронно, предпочтительнее
// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log('Folder created')
//     }
// })
//
// Удалить папку
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err) {
//         throw err
//     } else {
//         console.log('Folder deleted')
//     }
// })

// Полностью перезаписывает файл с данными
// Для добавления использовать fs.appendFile
// fs.writeFile(path.resolve(__dirname, 'text.txt'), '134r 45 3453 ', (err) => {
//     if(err) {
//         throw err
//     }
// })

// fs.readFile(path.resolve(__dirname, 'text.txt'), {encoding: 'utf-8'}, (err, data) => {
//     if(err) {
//         throw err
//     }
//     console.log(data)
// })

// Через переменную окружения передать строку, записать ее в файл
// прочитать файл, посчитать кол-во слов в файле и записать
// их в новый файл count.txt, затем удалить первый файл

fs.writeFile(path.resolve(__dirname, 'string.txt'), process.env.TEXT, (err) => {
    if(err) {
        throw err
    }
    fs.readFile(path.resolve(__dirname, 'string.txt'), {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            throw err
        }
        const counter = data.split(' ' || '\n').length.toString()
        fs.writeFile(path.resolve(__dirname, 'count.txt'), counter, (err) => {
            if(err) {
                throw err
            }
            fs.rm(path.resolve(__dirname, 'string.txt'), (err) => {
                if(err) {
                    throw err
                }
            })
        })
    })
})
