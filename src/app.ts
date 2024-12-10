import express from 'express';
import cors from 'cors';
import {SETTINGS} from './settings';
import {videosRouter} from './videos';
import { db } from './db/db';

export const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'});
});

app.use(SETTINGS.PATH.VIDEOS, videosRouter);

app.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.status(204).end();
});