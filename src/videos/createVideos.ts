import {Response, Request} from 'express';
import {OutputErrorsType} from '../types/error-types';
import {db} from '../db/db';
import {InputVideoType, Resolutions} from '../types/video-types';

const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    };

    if (!video.title || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'Error', field: 'title'
        });
    }

    if (!video.author || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'Error', field: 'author'
        });
    }

    if (!Array.isArray(video.availableResolution)
        || video.availableResolution.length === 0
        || video.availableResolution.some((res) => !Object.values(Resolutions).includes(res))) {
        errors.errorsMessages.push({
            message: 'Error', field: 'availableResolution'
        });
    }
    return errors;
}

export const createVideos = (req: Request<any, any, InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {
    const errors = inputValidation(req.body);
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return;
        // return res.status(400).json(errors)
    }

    const currentDate = new Date().toISOString();
    
    const newVideo: any /*VideoDBType*/ = {
        id: Math.max(...db.videos.map((video) => video.id)) + 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: currentDate,
        publicationDate: currentDate,
        availableResolution: req.body.availableResolution,
    };
    db.videos.push(newVideo);

    res
        .status(201)
        .json(newVideo);
};