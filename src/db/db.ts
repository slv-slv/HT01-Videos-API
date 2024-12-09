// import {VideoDBType} from './video-db-type'

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
  videos: any[] // VideoDBType[]
  // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
  videos: [
    {
      id: 1,
      title: 'Властелин колец: Братство кольца',
      author: 'Питер Джексон',
      canBeDownloaded: 'true',
      minAgeRestriction: null,
      createdAt: '2001-12-19',
      publicationDate: '2001-12-19',
      availableResolution: ['P480', 'P720', 'P1080'],
    },
    {
      id: 2,
      title: 'Игра',
      author: 'Дэвид Финчер',
      canBeDownloaded: 'true',
      minAgeRestriction: null,
      createdAt: '1997-08-01',
      publicationDate: '1997-08-01',
      availableResolution: ['P480', 'P720', 'P1080'],
    },
    {
      id: 3,
      title: 'Прометей',
      author: 'Ридли Скотт',
      canBeDownloaded: 'true',
      minAgeRestriction: null,
      createdAt: '2013-04-07',
      publicationDate: '2013-04-07',
      availableResolution: ['P720', 'P1080', 'P2160'],
    },
  ],
  // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
      db.videos = []
      // db.some = []
      return
  }

  // если что-то передано - то заменяем старые значения новыми
  db.videos = dataset.videos || db.videos
  // db.some = dataset.some || db.some
}