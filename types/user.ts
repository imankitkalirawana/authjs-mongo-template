import { ValuesOf } from '@/lib/utils';

export const genders = ['male', 'female', 'other'] as const;

export const userStatuses = [
  'active',
  'inactive',
  'blocked',
  'deleted',
  'unverified'
] as const;

export const userRoles = ['admin', 'user'] as const;

export interface UserType extends Base {
  email: string;
  phone: string;
  password: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  gender: Gender;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  state?: string;
}

export type Gender = ValuesOf<typeof genders>;
export type UserStatus = ValuesOf<typeof userStatuses>;
export type UserRole = ValuesOf<typeof userRoles>;
