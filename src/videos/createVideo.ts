import { Response, Request } from 'express';
import { db } from '../db/db';
import { getInputErrors, titleValidation, authorValidation, availableResolutionsValidation } from './inputValidation';

export const createVideo = (req: Request, res: Response) => {
  const { title, author, availableResolutions } = req.body;
  const validationFunctions = [
    () => titleValidation(title),
    () => authorValidation(author),
    () => availableResolutionsValidation(availableResolutions),
  ];
  const errors = getInputErrors(validationFunctions);

  if (errors.errorsMessages.length) {
    res.status(400).json(errors);
  }

  const defaultValues = {
    id: db.videos.length ? Math.max(...db.videos.map((video) => video.id)) + 1 : 1,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    availableResolutions: null,
  };
  const requestValues = req.body;

  const newVideo = { ...defaultValues, ...requestValues };
  db.videos.push(newVideo);

  res.status(201).json(newVideo);
};
