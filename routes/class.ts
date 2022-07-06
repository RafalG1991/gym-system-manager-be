import { Router } from 'express';
import { ClassRecord } from '../records/class.record';

export const classRouter = Router();

classRouter
  .get('/', async (req, res) => {
    const classes = await ClassRecord.getAll();
    const response = classes.map((item) => ({
      id: item.id,
      title: item.name,
      startTime: item.starts,
      endTime: item.ends,
      daysOfWeek: [item.day],
      url: `class/${item.id}`,
    }));
    return res
      .status(200)
      .json(response);
  });
