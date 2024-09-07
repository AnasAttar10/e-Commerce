import { Heading } from '@components/common';
import { CartItemList, CartSubtotal } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import { LottieHandler } from '@components/feedback';
import { useGetProductsInfoQuery } from '@store/cart/cartApi';
import {
  cartItemChangeQuantity,
  clearCart,
  removeCartItem,
} from '@store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useCallback, useState } from 'react';
import { useAddOrderMutation } from '@store/order/orderApi';
import ModalB from '@components/feedback/Modal/ModalB';

const Cart = () => {
  const [show, setShow] = useState(false);
  const { user, token } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const itemsId = Object.keys(items).includes(user?.id.toString())
    ? Object.keys(items[user?.id])
    : [];
  const concatenatedItemsId =
    itemsId.length > 0
      ? '?' + itemsId.map((el) => `id=${el}`).join('&')
      : '?id=0';
  const {
    isLoading,
    error,
    data: products,
  } = useGetProductsInfoQuery(concatenatedItemsId);
  const productsWithQuantity =
    products &&
    products?.map((p) => ({
      ...p,
      quantity: items[user.id][p.id],
    }));
  const subTotal = productsWithQuantity?.reduce(
    (sum, p) => sum + p.quantity * +p.price,
    0
  );
  const orderProducts = productsWithQuantity?.map((op) => ({
    id: op.id,
    price: op.price,
    img: op.img,
    title: op.title,
    quantity: op.quantity,
  }));

  const [addOrder, { isSuccess }] = useAddOrderMutation();
  const handleAddOrder = () => {
    setShow(true);
  };
  const handleChangeQuantity = useCallback(
    (id: string, quantity: number) => {
      dispatch(cartItemChangeQuantity({ userId: user.id, id, quantity }));
    },
    [dispatch, user.id]
  );

  const removeItem = useCallback(
    (id: string) => {
      dispatch(removeCartItem({ userId: user.id, id }));
    },
    [dispatch, user.id]
  );
  const handleSave = () => {
    addOrder({
      userId: user.id,
      items: orderProducts ?? [],
      subtotal: subTotal ?? 0,
    })
      .unwrap()
      .then(() => dispatch(clearCart(user.id)));
    setShow(false);
  };
  return (
    <>
      <ModalB
        show={show}
        title={'Placing Order'}
        message={`Are you sure you want to place order with subtitle : ${subTotal}`}
        handleClose={() => setShow(false)}
        handleSave={handleSave}
      />
      <Heading title="Cart" />
      <Loading isLoading={isLoading} error={error} type="cart">
        {products && products?.length > 0 ? (
          <>
            <CartItemList
              products={productsWithQuantity ?? []}
              handleChangeQuantity={handleChangeQuantity}
              removeItem={removeItem}
            />
            <CartSubtotal
              subTotal={subTotal || 0}
              token={token}
              handleAddOrder={handleAddOrder}
            />
          </>
        ) : isSuccess ? (
          <LottieHandler
            type="success"
            message="Your order has been placed successfully"
          />
        ) : (
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
