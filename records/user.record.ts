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

  public weight: string;

  public height: string;

  public memberSince: string;

  public membershipDate: string;

  constructor(userObj: UserEntity) {
    if (!userObj.email || userObj.email.trim().length === 0 || userObj.email.length > 320 || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(userObj.email)) {
      throw new ValidationError('Provide valid email');
    }
    if (!userObj.password || userObj.password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters');
    }

    this.id = userObj.id;
    this.email = userObj.email;
    this.password = userObj.password;
    this.firstname = userObj.firstname;
    this.lastname = userObj.lastname;
    this.height = userObj.height;
    this.weight = userObj.weight;
    this.memberSince = userObj.memberSince;
    this.membershipDate = userObj.membershipDate;
  }

  async addOne(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    this.password = await hashPassword(this.password);

    await pool.execute('INSERT INTO `users`(`id`, `email`, `password`) VALUES (:id, :email, :password)', {
      id: this.id,
      email: this.email,
      password: this.password,
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

  async updateName(): Promise<string> {
    if (
      !this.firstname || !this.lastname
      || this.firstname.trim().length === 0 || this.lastname.trim().length === 0
    ) {
      throw new ValidationError('Provide your first name and last name');
    }

    await pool.execute('UPDATE `users` SET `firstname` = :firstname, `lastname` = :lastname WHERE `id` = :id', {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
    });

    return this.id;
  }

  async updateBmiData(): Promise<string> {
    if (
      !this.weight
      || !this.height
      || Number(this.weight) < 0
      || Number(this.weight) > 999
      || Number(this.height) < 0
      || Number(this.height) > 300
    ) {
      throw new ValidationError('Provide valid height and weight');
    }

    await pool.execute('UPDATE `users` SET `height` = :height, `weight` = :weight WHERE `id` = :id', {
      id: this.id,
      height: this.height,
      weight: this.weight,
    });

    return this.id;
  }

  async changePassword(): Promise<string> {
    if (!this.password || this.password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters');
    }

    this.password = await hashPassword(this.password);

    await pool.execute('UPDATE `users` SET `password` = :password WHERE `id` = :id', {
      id: this.id,
      password: this.password,
    });

    return this.id;
  }

  async extendMembership(): Promise<string> {
    const date = new Date();
    if (this.membershipDate) {
      if (new Date(this.membershipDate) < date) {
        date.setMonth(date.getMonth() + 1);
      } else {
        date.setMonth((new Date(this.membershipDate)).getMonth() + 1);
      }
    }

    await pool.execute('UPDATE `users` SET `membershipDate` = :membershipDate WHERE `id` = :id', {
      id: this.id,
      membershipDate: date,
    });

    return this.id;
  }
}
