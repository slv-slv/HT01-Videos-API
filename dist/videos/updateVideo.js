"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideo = exports.getInputErrors = void 0;
const db_1 = require("../db/db");
const inputValidation_1 = require("./inputValidation");
const getInputErrors = (video) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = video;
    const errors = {
        errorsMessages: []
    };
    const validationFunctions = [
        () => (0, inputValidation_1.titleValidation)(title),
        () => (0, inputValidation_1.authorValidation)(author),
        () => (0, inputValidation_1.availableResolutionsValidation)(availableResolutions),
        () => (0, inputValidation_1.canBeDownloadedValidation)(canBeDownloaded),
        () => (0, inputValidation_1.minAgeRestrictionValidation)(minAgeRestriction),
        () => (0, inputValidation_1.publicationDateValidation)(publicationDate),
    ];
    validationFunctions.forEach((validationFunction) => {
        const error = validationFunction();
        if (error) {
            errors.errorsMessages.push(error);
        }
    });
    return errors;
};
exports.getInputErrors = getInputErrors;
const updateVideo = (req, res) => {
    const id = parseInt(req.params.id);
    const dbIndex = db_1.db.videos.findIndex((video) => video.id === id);
    if (dbIndex === -1) {
        res.status(404).json({ message: 'Video not found' });
    }
    const requestValues = req.body;
    const errors = (0, exports.getInputErrors)(requestValues);
    if (errors.errorsMessages.length) {
        res.status(400).json(errors);
    }
    db_1.db.videos[dbIndex] = Object.assign(Object.assign({}, db_1.db.videos[dbIndex]), requestValues);
    res.status(204).end();
};
exports.updateVideo = updateVideo;
