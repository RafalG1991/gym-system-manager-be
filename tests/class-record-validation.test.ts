import { ClassRecord } from '../records/class.record';

const defaultObj = {
  id: 'abcd',
  name: 'Test event',
  description: 'Test description',
  starts: '12:00',
  ends: '14:00',
  day: 5,
};

test('Name validation - not empty and maximum length is 50 characters', () => {
  expect(() => new ClassRecord(defaultObj)).not.toThrow();
  expect(() => new ClassRecord({
    ...defaultObj,
    name: '',
  })).toThrow('Provide valid name with maximum length of 50 characters');
});

test('Description validation - not be empty and maximum length is 400 characters', () => {
  expect(() => new ClassRecord(defaultObj)).not.toThrow();
  expect(() => new ClassRecord({
    ...defaultObj,
    description: '',
  })).toThrow('Provide valid description with maximum length of 50 characters');
});

test('Start time validation - not be empty and match the HH:MM time pattern - 24H with optional leading zero', () => {
  expect(() => new ClassRecord(defaultObj)).not.toThrow();
  expect(() => new ClassRecord({
    ...defaultObj,
    starts: '25:88',
  })).toThrow('Provide valid start time');
});

test('End time validation - not be empty and match the HH:MM time pattern - 24H with optional leading zero', () => {
  expect(() => new ClassRecord(defaultObj)).not.toThrow();
  expect(() => new ClassRecord({
    ...defaultObj,
    ends: '25:88',
  })).toThrow('Provide valid end time');
});

test('Day of the week number validation - must be a number in range from 0 to 6 - not less than 0 and not greater than 6', () => {
  expect(() => new ClassRecord(defaultObj)).not.toThrow();
  expect(() => new ClassRecord({
    ...defaultObj,
    day: -1,
  })).toThrow('Provide valid day of the week number');
});
