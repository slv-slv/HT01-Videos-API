import {Request, Response} from 'express';
import {db} from '../db/db';

export const findVideo = (req: Request, res: Response) => {
    const videos = db.videos;
    res
        .status(200)
        .json(videos);
}