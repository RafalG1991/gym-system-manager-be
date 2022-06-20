import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { UserEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { pool } from '../utils/db';
import { hashPassword } from '../utils/bcrypt';

type UserRecordResults = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
  public id: string;

  public email: string;

  public password: string;

  public firstname: string;

  public lastname: string;

  constructor(userObj: UserEntity) {
    if (!userObj.email || userObj.email.trim().length === 0 || userObj.email.length > 320 || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(userObj.email)) {
      throw new ValidationError('Provide valid email');
    }
    if (!userObj.password || userObj.password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters');
    }

    if (
      !userObj.firstname || !userObj.lastname
      || userObj.firstname.trim().length === 0 || userObj.lastname.trim().length === 0
    ) {
      throw new ValidationError('Provide your first name and last name');
    }

    this.id = userObj.id;
    this.email = userObj.email;
    this.password = userObj.password;
    this.firstname = userObj.firstname;
    this.lastname = userObj.lastname;
  }

  async addOne(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    this.password = await hashPassword(this.password);

    await pool.execute('INSERT INTO `users`(`id`, `email`, `password`, `firstname`, `lastname`) VALUES (:id, :email, :password, :firstname, :lastname)', {
      id: this.id,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
    });

    return this.id;
  }

  static async getOneById(id: string): Promise<UserRecord | null> {
    const [results] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id,
    }) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getOneByEmail(email: string): Promise<UserRecord | null> {
    const [results] = await pool.execute('SELECT * FROM `users` WHERE `email` = :email', {
      email,
    }) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }
}
