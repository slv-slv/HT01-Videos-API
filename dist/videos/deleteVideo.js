"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = void 0;
const db_1 = require("../db/db");
const deleteVideo = (req, res) => {
    const id = parseInt(req.params.id);
    const dbIndex = db_1.db.videos.findIndex((video) => video.id === id);
    if (dbIndex === -1) {
        res.status(404).json({ message: 'Video not found' });
    }
    db_1.db.videos.splice(dbIndex, 1);
    res.status(204).end();
};
exports.deleteVideo = deleteVideo;
