import { Router } from 'express';
import { getVideos } from './getVideos';
import { findVideo } from './findVideo';
import { createVideo } from './createVideo';
import { updateVideo } from './updateVideo';
import { deleteVideo } from './deleteVideo';

export const videosRouter = Router();

videosRouter.get('/', getVideos);
videosRouter.get('/:id', findVideo);
videosRouter.post('/', createVideo);
videosRouter.put('/:id', updateVideo);
videosRouter.delete('/:id', deleteVideo);