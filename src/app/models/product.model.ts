export class Product {
    _id?: string;
    publisherId?:{
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
    };
    image?: string;
    images?:[{
      _id?: string;
      url?: string
    }];
    title?: string;
    size?: string;
    price?: number;
  }
