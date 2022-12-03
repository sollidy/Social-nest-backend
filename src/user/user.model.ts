export class UserModel {
  email: string;
  password: string;
  name: string;
  status?: string;
  followedIds?: Array<string>;
  followed?: boolean;
  photos: {
    small?: string;
    large?: string;
  };
  roles: Array<string>;
}
