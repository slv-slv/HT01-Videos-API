import { Router } from 'express';
import { getVideos } from './getVideos';
import { createVideos } from './createVideos';
import { findVideo } from './findVideo';

export const videosRouter = Router();

const videosController = {
    getVideos,
    createVideos,
    findVideo,
};

videosRouter.get('/', videosController.getVideos);
videosRouter.post('/', videosController.createVideos);
videosRouter.get('/:id', videosController.findVideo);
// videosRouter.delete('/:id', deleteVideos)
// ...
