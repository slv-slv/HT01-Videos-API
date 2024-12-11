"use strict";
// import {VideoDBType} from './video-db-type'
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
exports.db = {
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
};
// функция для быстрой очистки/заполнения базы данных для тестов
const setDB = (dataset) => {
    if (!dataset) {
        exports.db.videos = [];
        return;
    }
    exports.db.videos = dataset.videos || exports.db.videos;
};
exports.setDB = setDB;
