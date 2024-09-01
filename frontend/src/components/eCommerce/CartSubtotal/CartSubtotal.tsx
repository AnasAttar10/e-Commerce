import { Button } from 'react-bootstrap';
import styles from './styles.module.css';
type TcartSubtotal = {
  subTotal: number;
  token: string;
  handleAddOrder: () => void;
};
const CartSubtotal = ({ subTotal, token, handleAddOrder }: TcartSubtotal) => {
  return (
    <>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subTotal} EGP</span>
      </div>
      {token && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: 'white' }}
              onClick={handleAddOrder}
            >
              Place Oreder
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotal;
