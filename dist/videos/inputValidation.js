"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicationDateValidation = exports.minAgeRestrictionValidation = exports.canBeDownloadedValidation = exports.availableResolutionsValidation = exports.authorValidation = exports.titleValidation = void 0;
const video_types_1 = require("../types/video-types");
const titleValidation = (title) => {
    if (!title) {
        return {
            message: 'A title is required',
            field: 'title',
        };
    }
    if (typeof title !== 'string') {
        return {
            message: 'The title must be a string',
            field: 'title',
        };
    }
    if (title.length > 40) {
        return {
            message: 'The title must not be longer than 40 characters',
            field: 'title',
        };
    }
};
exports.titleValidation = titleValidation;
const authorValidation = (author) => {
    if (!author) {
        return {
            message: 'An author name is required',
            field: 'author',
        };
    }
    if (typeof author !== 'string') {
        return {
            message: 'The author name must be a string',
            field: 'author',
        };
    }
    if (author.length > 20) {
        return {
            message: 'The author name must not be longer than 20 characters',
            field: 'author',
        };
    }
};
exports.authorValidation = authorValidation;
const availableResolutionsValidation = (availableResolutions) => {
    if (availableResolutions === null)
        return;
    if (!Array.isArray(availableResolutions)) {
        return {
            message: 'Incorrect resolution list format',
            field: 'availableResolutions',
        };
    }
    if (availableResolutions.length === 0) {
        return {
            message: 'Resolution list must not be empty',
            field: 'availableResolutions',
        };
    }
    if (availableResolutions.some((res) => !Object.values(video_types_1.Resolutions).includes(res))) {
        return {
            message: 'Incorrect resolution values',
            field: 'availableResolutions',
        };
    }
};
exports.availableResolutionsValidation = availableResolutionsValidation;
const canBeDownloadedValidation = (canBeDownloaded) => {
    if (typeof canBeDownloaded !== 'boolean') {
        return {
            message: 'The canBeDownloaded field must be a boolean',
            field: 'canBeDownloaded',
        };
    }
};
exports.canBeDownloadedValidation = canBeDownloadedValidation;
const minAgeRestrictionValidation = (minAgeRestriction) => {
    if (minAgeRestriction === null)
        return;
    if (typeof minAgeRestriction !== 'number') {
        return {
            message: 'The minAgeRestriction field must be a number',
            field: 'minAgeRestriction',
        };
    }
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        return {
            message: 'The minAgeRestriction field must be between 1 and 18',
            field: 'minAgeRestriction',
        };
    }
};
exports.minAgeRestrictionValidation = minAgeRestrictionValidation;
const publicationDateValidation = (publicationDate) => {
    if (new Date(publicationDate).toString() === 'Invalid Date') {
        return {
            message: 'Incorrect publication date format',
            field: 'publicationDate',
        };
    }
};
exports.publicationDateValidation = publicationDateValidation;
