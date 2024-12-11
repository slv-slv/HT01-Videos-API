"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVideo = void 0;
const db_1 = require("../db/db");
const findVideo = (req, res) => {
    const id = parseInt(req.params.id);
    const video = db_1.db.videos.find((video) => video.id === id);
    if (video) {
        res.status(200).json(video);
    }
    else {
        res.status(404).json({ message: 'Video not found' });
    }
};
exports.findVideo = findVideo;
