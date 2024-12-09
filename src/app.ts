import express from 'express'
import cors from 'cors'
import {SETTINGS} from './settings'
import {videosRouter} from './videos'

export const app = express() // создать приложение
app.use(express.json()) // парсинг JSON в теле запроса и добавление его как объект в свойство body запроса
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)