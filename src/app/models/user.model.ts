export class User{
  _id?: string;
  firstName?: string;
  email?: string;
  username?: string;
  password?: string;
  lastName?: string;
  dateOfBirth?: string;
  emailVerified?: boolean;
  createDate?: string;
  image?: {
    _id?: string;
    url?: string;
  };
  location?: string;
}
