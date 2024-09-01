import { IProduct } from '@customTypes/product';
import CartItem from '../CartItem/CartItem';
type TCartList = {
  products: IProduct[];
  handleChangeQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};
const CartItemList = ({
  products,
  handleChangeQuantity,
  removeItem,
}: TCartList) => {
  const productsInfo =
    products &&
    products?.map((p) => (
      <CartItem
        key={p.id}
        {...p}
        handleChangeQuantity={handleChangeQuantity}
        removeItem={removeItem}
      />
    ));
  return <div>{productsInfo}</div>;
};

export default CartItemList;
