import { Response, Request } from 'express';
import { db } from '../db/db';
import { OutputErrorsArrayType } from '../types/error-types';
import { InputVideoType } from '../types/video-types';
import { titleValidation, authorValidation, availableResolutionsValidation } from './inputValidation';

export const getInputErrors = (video: InputVideoType): OutputErrorsArrayType => {
    const { title, author, availableResolutions } = video;
    
    const errors: OutputErrorsArrayType = {
        errorsMessages: []
    };

    const validationFunctions = [
        () => titleValidation(title),
        () => authorValidation(author),
        () => availableResolutionsValidation(availableResolutions),
    ];

    validationFunctions.forEach((validationFunction) => {
        const error = validationFunction();
        if (error) {
            errors.errorsMessages.push(error);
        }
    });

    return errors;
  }

export const createVideo = (req: Request, res: Response) => {
    const requestValues = req.body;
    const errors = getInputErrors(requestValues);
    if (errors.errorsMessages.length) {
        res.status(400).json(errors);
    }
    
    const defaultValues = {
        id: Math.max(...db.videos.map((video) => video.id)) + 1,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
        availableResolutions: null,
    };
    
    const newVideo = { ...defaultValues, ...requestValues };
    db.videos.push(newVideo);
    res.status(201).json(newVideo);
};