import { Request, Response } from 'express';
import { db } from '../db/db';

export const findVideo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const video = db.videos.find((video) => video.id === id);
    if (video) {
        res.status(200).json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
    
}