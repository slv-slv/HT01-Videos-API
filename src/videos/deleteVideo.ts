import { Request, Response } from 'express';
import { db } from '../db/db';

export const deleteVideo = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const dbIndex = db.videos.findIndex((video) => video.id === id);
  if (dbIndex === -1) {
    res.status(404).json({ message: 'Video not found' });
  }

  db.videos.splice(dbIndex, 1);
  res.status(204).end();
};
