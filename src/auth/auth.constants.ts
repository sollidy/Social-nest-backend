export const ALREADY_EXIST_EMAIL_ERROR = 'Email already existing';
export const USER_NOT_FOUND_ERROR = 'User with that email not found';
export const WRONG_PASSWORD_ERROR = 'Password is wrong';
export const ID_NOT_FOUND_ERROR = 'User not found';
export const ONLY_ADMIN_ACCESS_ERROR = 'Only admin access';
export const INVALID_ID_ERROR = 'Invalid Id format';

export const ROLE_USER = 'USER';
export const ROLE_ADMIN = 'ADMIN';
export const ANY_USER = 'ANY';

export type TypeRole =
  | typeof ROLE_USER
  | typeof ROLE_ADMIN
  | typeof ANY_USER
  | undefined;
