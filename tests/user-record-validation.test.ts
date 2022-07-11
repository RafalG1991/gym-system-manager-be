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
describe('Email validation', () => {
  test('Email validation - not empty string', () => {
    expect(() => new UserRecord(defaultObj)).not.toThrow();
    expect(() => new UserRecord({
      ...defaultObj,
      email: '',
    })).toThrow('Provide valid email');
  });

  test('Email validation - maximum length is 320 characters', () => {
    expect(() => new UserRecord(defaultObj)).not.toThrow();
    expect(() => new UserRecord({
      ...defaultObj,
      email: 'fgdgnuiwefiuasbcncuizhc8awhoasnslcnsaocas8qrq0rqjfajfposmclznvkvnkvxuiovhhh48h9292859380hr0qwhf0ah0fazvznoafniaoufioaufoiuafiafousahfuioahfuioashfioasofaosifhashfahosfhashofaofhoho@fhfhfodfpdhvphv89xv8hv8dvopsdjvowjtp2ut0923ut032jtqijfiopajpoizjvzv-zu0vu-0u-3qfiojaopivjzpvzxuvuqru1u2ur-2u1021eoiqwjadsa-asufhiaoasodasofidajf.com',
    })).toThrow('Provide valid email');
  });

  test('Email validation - must have a valid email structure', () => {
    expect(() => new UserRecord(defaultObj)).not.toThrow();
    expect(() => new UserRecord({
      ...defaultObj,
      email: 'notvalidemail',
    })).toThrow('Provide valid email');
  });
});

describe('Password validation', () => {
  test('Password validation - not be empty string', () => {
    expect(() => new UserRecord(defaultObj)).not.toThrow();
    expect(() => new UserRecord({
      ...defaultObj,
      password: '',
    })).toThrow('Password must be at least 8 characters');
  });
  test('Password validation - minimum length is 8 characters', () => {
    expect(() => new UserRecord(defaultObj)).not.toThrow();
    expect(() => new UserRecord({
      ...defaultObj,
      password: 'test',
    })).toThrow('Password must be at least 8 characters');
  });
});

describe('updateName method validation', () => {
  test('updateName method throws an error if first name is an empty string', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      firstname: '',
    });
    await expect(testUser.updateName()).rejects.toThrow('Provide your first name and last name');
  });

  test('updateName method throws an error if first name contains white spaces only', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      firstname: '     ',
    });
    await expect(testUser.updateName()).rejects.toThrow('Provide your first name and last name');
  });

  test('updateName method throws an error if last name is an empty string', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      lastname: '',
    });
    await expect(testUser.updateName()).rejects.toThrow('Provide your first name and last name');
  });

  test('updateName method throws an error if last name contains white spaces only', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      lastname: '    ',
    });
    await expect(testUser.updateName()).rejects.toThrow('Provide your first name and last name');
  });
});

describe('updateBmiData method validation', () => {
  test('updateBmiData method throws an error if height is null', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      height: null,
    });
    await expect(testUser.updateBmiData()).rejects.toThrow('Provide valid height and weight');
  });

  test('updateBmiData method throws an error if parsed height is less than 0', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      height: '-10',
    });
    await expect(testUser.updateBmiData()).rejects.toThrow('Provide valid height and weight');
  });

  test('updateBmiData method throws an error if parsed height is greater than 300', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      height: '350',
    });
    await expect(testUser.updateBmiData()).rejects.toThrow('Provide valid height and weight');
  });

  test('updateBmiData method throws an error if weight is null', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      weight: null,
    });
    await expect(testUser.updateBmiData()).rejects.toThrow('Provide valid height and weight');
  });

  test('updateBmiData method throws an error if parsed weight is less than 0', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      weight: '-10',
    });
    await expect(testUser.updateBmiData()).rejects.toThrow('Provide valid height and weight');
  });

  test('updateBmiData method throws an error if parsed weight is greater than 999', async () => {
    expect.assertions(1);
    const testUser = new UserRecord({
      ...defaultObj,
      weight: '1000',
    });
    await expect(testUser.updateBmiData()).rejects.toThrow('Provide valid height and weight');
  });
});
