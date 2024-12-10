import { Router } from 'express';
import { getVideos } from './getVideos';
import { findVideo } from './findVideo';
import { updateVideo } from './updateVideo';
import { createVideo } from './createVideo';

export const videosRouter = Router();

const videosController = {
    getVideos,
    findVideo,
    updateVideo,
    createVideo,
};

videosRouter.get('/', videosController.getVideos);
videosRouter.get('/:id', videosController.findVideo);
videosRouter.put('/:id', videosController.updateVideo);
videosRouter.post('/', videosController.createVideo);

// videosRouter.delete('/:id', deleteVideos)
// ...
