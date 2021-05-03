export class Product {
    _id?: string;
    type?: string;
    category?: string;
    __v?: number;
    title?: string;
    size?: string;
    price?: number;
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

  }
