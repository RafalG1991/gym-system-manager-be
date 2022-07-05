import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { ClassEntity, DayOfTheWeek } from '../types';
import { ValidationError } from '../utils/errors';
import { pool } from '../utils/db';

type ClassRecordResults = [ClassRecord[], FieldPacket[]];

export class ClassRecord implements ClassEntity {
  public id: string;

  public name: string;

  public description: string;

  public starts: string;

  public ends: string;

  public day: DayOfTheWeek;

  constructor(classObj: ClassEntity) {
    if (!classObj.name
      || classObj.name.trim().length === 0
      || classObj.name.length > 50) {
      throw new ValidationError('Provide valid name with maximum length of 50 characters');
    }
    if (!classObj.description
      || classObj.description.trim().length === 0
      || classObj.description.length > 400) {
      throw new ValidationError('Provide valid description with maximum length of 50 characters');
    }
    if (!classObj.starts
      || classObj.starts.trim().length === 0
      || /^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(classObj.starts)
    ) {
      throw new ValidationError('Provide valid start time');
    }

    if (!classObj.ends
      || classObj.ends.trim().length === 0
      || /^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(classObj.ends)
    ) {
      throw new ValidationError('Provide valid end time');
    }

    if (!classObj.day
      || classObj.day.trim().length === 0
      || !(classObj.day.toUpperCase() in DayOfTheWeek)
    ) {
      throw new ValidationError('Provide valid day of the week');
    }

    this.id = classObj.id;
    this.name = classObj.name;
    this.description = classObj.description;
    this.starts = classObj.starts;
    this.ends = classObj.ends;
    this.day = classObj.day;
  }

  async addOne(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO `classes`(`id`, `name`, `description`, `starts`, `ends`, `day`) VALUES (:id, :name, :description, :starts, :ends, :day)', {
      id: this.id,
      name: this.name,
      description: this.description,
      starts: this.starts,
      ends: this.ends,
      day: this.day,
    });

    return this.id;
  }
}
