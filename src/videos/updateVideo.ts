import { Response, Request } from 'express';
import { db } from '../db/db';
import {
  getInputErrors,
  titleValidation,
  authorValidation,
  availableResolutionsValidation,
  canBeDownloadedValidation,
  minAgeRestrictionValidation,
  publicationDateValidation,
} from './inputValidation';

export const updateVideo = (req: Request, res: Response) => {
  const id = +req.params.id;
  const dbIndex = db.videos.findIndex((video) => video.id === id);
  if (dbIndex === -1) {
    res.status(404).json({ message: 'Video not found' });
  }

  const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
  const validationFunctions = [
    () => titleValidation(title),
    () => authorValidation(author),
    () => availableResolutionsValidation(availableResolutions),
    () => canBeDownloadedValidation(canBeDownloaded),
    () => minAgeRestrictionValidation(minAgeRestriction),
    () => publicationDateValidation(publicationDate),
  ];
  const errors = getInputErrors(validationFunctions);
  if (errors.errorsMessages.length) {
    res.status(400).json(errors);
  }

  const requestValues = req.body;
  db.videos[dbIndex] = { ...db.videos[dbIndex], ...requestValues };
  res.status(204).end();
};
