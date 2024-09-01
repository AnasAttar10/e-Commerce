import { Button, Form } from 'react-bootstrap';
import styles from './styles.module.css';
import { IProduct } from '@customTypes/product';
import { memo } from 'react';
const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItem = IProduct & {
  handleChangeQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};
const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    handleChangeQuantity,
    removeItem,
  }: TCartItem) => {
    const renderOptions = Array(max)
      .fill(0)
      .map((_, index) => {
        const quantity = ++index;
        return (
          <option value={quantity} key={Math.random()}>
            {quantity}
          </option>
        );
      });

    const removeItemHandler = (id: string) => {
      removeItem(id);
    };
    const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = +e.target.value;
      handleChangeQuantity(id, value);
    };
    return (
      <div className={cartItem} key={id}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: 'white', width: '100px' }}
              className="mt-auto"
              onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity ?? 0} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
