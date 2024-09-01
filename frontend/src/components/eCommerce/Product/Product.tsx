import { Button, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import { IProduct } from '@types';
import { addCart, isArrivedMax } from '@store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { memo, useEffect, useState } from 'react';
import LikeFill from '@assets/svg/like-fill.svg?react';
import Like from '@assets/svg/like.svg?react';
import { useLikeToggleMutation } from '@store/wishlist/wishlishApi';
const { product, productImg, maximumNotice, wishlistBtn } = styles;
const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    showLikeIcon = true,
    isLiked,
    showReachedMaxMessage = true,
    showButton = true,
    quantity,
    showQuantity = false,
  }: IProduct) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const isMax = useAppSelector((state) =>
      isArrivedMax(state, user.id, id, max)
    );
    const [likeToggle, { isLoading }] = useLikeToggleMutation();

    const handleAddToCar = () => {
      dispatch(addCart({ userId: user.id, productId: id }));
      setIsDisabled(true);
    };
    const handlelikeToggle = () => {
      if (isLoading) return;
      likeToggle({
        isLiked: isLiked ?? false,
        userId: user.id,
        productId: id,
      });
    };
    useEffect(() => {
      if (!isDisabled) return;
      const depound = setTimeout(() => {
        setIsDisabled(false);
      }, 300);
      return () => clearTimeout(depound);
    }, [isDisabled]);
    return (
      <div className={product}>
        {showLikeIcon && (
          <div className={wishlistBtn} onClick={handlelikeToggle}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
        )}
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2 title={title}>{title}</h2>
        <h3>{price} EGP</h3>
        {showQuantity && (
          <h3 className={maximumNotice}>Quantity {quantity} </h3>
        )}
        {showReachedMaxMessage && isMax && (
          <h3 className={maximumNotice}>You Reached to the limit </h3>
        )}
        {showButton && (
          <Button
            variant="info"
            style={{ color: 'white' }}
            onClick={handleAddToCar}
            disabled={isDisabled || isMax}
          >
            {isDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading ...{' '}
              </>
            ) : (
              'Add to cart'
            )}
          </Button>
        )}
      </div>
    );
  }
);

export default Product;
