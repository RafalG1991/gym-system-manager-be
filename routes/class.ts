import { Router } from 'express';
import { ClassRecord } from '../records/class.record';

export const classRouter = Router();

classRouter
  .get('/', async (req, res) => {
    const classes = await ClassRecord.getAll();
    return res
      .status(200)
      .json({ classes });
  });
