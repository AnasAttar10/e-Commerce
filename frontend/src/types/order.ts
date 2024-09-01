import { IProduct } from './product';

export interface IOrderResponsve {
  id: string;
  userId: string;
  items: IProduct[];
  subtotal: number;
}
