import { ClassRecord } from '../records/class.record';

const defaultObj = {
  id: 'abcd',
  name: 'Test event',
  description: 'Test description',
  starts: '12:00',
  ends: '14:00',
  day: 5,
};

describe('Name validation', () => {
  test('Name validation - not empty', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      name: '',
    })).toThrow('Provide valid name with maximum length of 50 characters');
  });

  test('Name validation - maximum length is 50 characters', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      name: 'fgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibf',
    })).toThrow('Provide valid name with maximum length of 50 characters');
  });
});

describe('Description validation', () => {
  test('Description validation - not be empty', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      description: '',
    })).toThrow('Provide valid description with maximum length of 50 characters');
  });

  test('Description validation - maximum length is 400 characters', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      description: 'fgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibffgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocasfdfsdiu3ibf',
    })).toThrow('Provide valid description with maximum length of 50 characters');
  });
});

describe('Start time validation', () => {
  test('Start time validation - not be empty', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      starts: '',
    })).toThrow('Provide valid start time');
  });

  test('Start time validation - matches the HH:MM:SS time pattern - 24H with optional leading zero', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      starts: '25:88',
    })).toThrow('Provide valid start time');
  });
});

describe('End time validation', () => {
  test('End time validation - not be empty', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      ends: '',
    })).toThrow('Provide valid end time');
  });

  test('End time validation - matches the HH:MM:SS time pattern - 24H with optional leading zero', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      ends: '25:88',
    })).toThrow('Provide valid end time');
  });
});

describe('Day of the week number validation', () => {
  test('Day of the week number validation - must not be less than 0', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      day: -1,
    })).toThrow('Provide valid day of the week number');
  });

  test('Day of the week number validation - must not be greater than 6', () => {
    expect(() => new ClassRecord(defaultObj)).not.toThrow();
    expect(() => new ClassRecord({
      ...defaultObj,
      day: 7,
    })).toThrow('Provide valid day of the week number');
  });
});
