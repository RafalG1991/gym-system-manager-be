import { UserRecord } from '../records/user.record';

const defaultObj = {
  id: 'abcd',
  email: 'test@test.com',
  password: 'password',
  firstname: 'Test',
  lastname: 'User',
  weight: '50',
  height: '165',
  memberSince: '01-01-2022',
  membershipDate: '01-12-2022',
};

test('Email validation - not empty and maximum length is 320 characters and must have a valid email structure', () => {
  expect(() => new UserRecord(defaultObj)).not.toThrow();
  expect(() => new UserRecord({
    ...defaultObj,
    email: '',
  })).toThrow('Provide valid email');
});

test('Password validation - not be empty and minimum length is 8 characters', () => {
  expect(() => new UserRecord(defaultObj)).not.toThrow();
  expect(() => new UserRecord({
    ...defaultObj,
    password: 'test',
  })).toThrow('Password must be at least 8 characters');
});
