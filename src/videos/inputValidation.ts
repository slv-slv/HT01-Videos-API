import { OutputErrorType } from "../types/error-types";
import { InputVideoType, Resolutions } from "../types/video-types";

export const titleValidation = (title: string): OutputErrorType | undefined => {
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

export const authorValidation = (author: string): OutputErrorType | undefined => {
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

export const availableResolutionsValidation = (availableResolutions: Resolutions[]): OutputErrorType | undefined => {
  if (availableResolutions === null) return;

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

  if (availableResolutions.some((res) => !Object.values(Resolutions).includes(res))) {
    return {
      message: 'Incorrect resolution values',
      field: 'availableResolutions',
    };
  }
};

export const canBeDownloadedValidation = (canBeDownloaded: boolean): OutputErrorType | undefined => {
  if (typeof canBeDownloaded !== 'boolean') {
    return {
      message: 'The canBeDownloaded field must be a boolean',
      field: 'canBeDownloaded',
    };
  }
};

export const minAgeRestrictionValidation = (minAgeRestriction: number | null): OutputErrorType | undefined => {
  if (minAgeRestriction === null) return;

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

export const publicationDateValidation = (publicationDate: string): OutputErrorType | undefined => {
  if (new Date(publicationDate).toString() === 'Invalid Date') {
    return {
      message: 'Incorrect publication date format',
      field: 'publicationDate',
    };
  }
};
