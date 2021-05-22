import { Category } from './category.model';
import { User } from './user.model';
export class Product {
  _id?: string;
  publisherId?: User;
  images?: any;
  title?: string;
  size?: string;
  price?: number;
  type?: string;
  description?: string;
  publishedDate?: Date;
  sold?: boolean;
  category?: Category;
}
