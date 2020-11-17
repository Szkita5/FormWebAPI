export enum Gender{
  Male = 0,
  Female = 1,
  Other = 2
}

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  email: string;
  phoneNumber: number;
}
