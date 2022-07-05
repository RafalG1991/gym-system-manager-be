export enum DayOfTheWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export interface ClassEntity {
  id: string;
  name: string;
  description: string;
  starts: string;
  ends: string;
  day: DayOfTheWeek;
}
