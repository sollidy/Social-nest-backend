export class CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  roles: string[];
}
