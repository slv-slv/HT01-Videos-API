"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideo = exports.getInputErrors = void 0;
const db_1 = require("../db/db");
const inputValidation_1 = require("./inputValidation");
const getInputErrors = (video) => {
    const { title, author, availableResolutions } = video;
    const errors = {
        errorsMessages: []
    };
    const validationFunctions = [
        () => (0, inputValidation_1.titleValidation)(title),
        () => (0, inputValidation_1.authorValidation)(author),
        () => (0, inputValidation_1.availableResolutionsValidation)(availableResolutions),
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
const createVideo = (req, res) => {
    const requestValues = req.body;
    const errors = (0, exports.getInputErrors)(requestValues);
    if (errors.errorsMessages.length) {
        res.status(400).json(errors);
    }
    const defaultValues = {
        id: Math.max(...db_1.db.videos.map((video) => video.id)) + 1,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
        availableResolutions: null,
    };
    const newVideo = Object.assign(Object.assign({}, defaultValues), requestValues);
    db_1.db.videos.push(newVideo);
    res.status(201).json(newVideo);
};
exports.createVideo = createVideo;
