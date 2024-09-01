import HeaderCounter from '../HeaderCounter/HeaderCounter';
import CartLogo from '@assets/svg/cart.svg?react';
import WishlistLogo from '@assets/svg/wishlist.svg?react';
import styles from './styles.module.css';
import { useAppSelector } from '@store/hooks';
import { getCartTotalQuantity } from '@store/cart/cartSlice';
import { useGetWishlistItemsQuery } from '@store/wishlist/wishlishApi';
import { memo } from 'react';
const { headerLeftBar } = styles;
const HeaderLeftBar = memo(() => {
  const { user } = useAppSelector((state) => state.auth);
  const cartTotalquantities = useAppSelector((state) =>
    getCartTotalQuantity(state, user.id)
  );
  const { data: wishlistItems } = useGetWishlistItemsQuery(user.id);
  const wishlistTotalquantities = wishlistItems?.length || 0;
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        totalquantities={wishlistTotalquantities}
        title={'Wishlist'}
        logo={<WishlistLogo title="wishlist" />}
        to="/wishlist"
      />
      |
      <HeaderCounter
        totalquantities={cartTotalquantities}
        title={'cart'}
        logo={<CartLogo title="cart" />}
        to="/cart"
      />
    </div>
  );
});

export default HeaderLeftBar;
