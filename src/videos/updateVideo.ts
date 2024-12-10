import { Response, Request } from 'express';
import { db } from '../db/db';
import { OutputErrorsArrayType } from '../types/error-types';
import { UpdateVideoType } from '../types/video-types';
import
  { titleValidation,
    authorValidation,
    availableResolutionsValidation,
    canBeDownloadedValidation,
    minAgeRestrictionValidation,
    publicationDateValidation,
  } from './inputValidation';

export const getInputErrors = (video: UpdateVideoType) => {
  const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = video;
  
  const errors: OutputErrorsArrayType = {
      errorsMessages: []
  };

  const validationFunctions = [
      () => titleValidation(title),
      () => authorValidation(author),
      () => availableResolutionsValidation(availableResolutions),
      () => canBeDownloadedValidation(canBeDownloaded),
      () => minAgeRestrictionValidation(minAgeRestriction),
      () => publicationDateValidation(publicationDate),
  ];

  validationFunctions.forEach((validationFunction) => {
      const error = validationFunction();
      if (error) {
          errors.errorsMessages.push(error);
      }
  });

  return errors;
}

export const updateVideo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const dbIndex = db.videos.findIndex((video) => video.id === id);
  if (dbIndex === -1) {
      res.status(404).json({ message: 'Video not found' });
  }

  const requestValues = req.body;
  const errors = getInputErrors(requestValues);
  if (errors.errorsMessages.length) {
      res.status(400).json(errors);
  }
  
  db.videos[dbIndex] = { ...db.videos[dbIndex], ...requestValues };
  res.status(204).end();
};