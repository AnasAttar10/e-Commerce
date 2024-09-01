import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import { Product } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import { useGetProductsInfoQuery } from '@store/cart/cartApi';
import { useAppSelector } from '@store/hooks';
import { useGetWishlistItemsQuery } from '@store/wishlist/wishlishApi';
import { Container } from 'react-bootstrap';

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: wishlistItems,
    isLoading: wishlistLoading,
    error: wishlistError,
  } = useGetWishlistItemsQuery(user.id);
  const concatnatedProductsId =
    wishlistItems && wishlistItems.length > 0
      ? '?' + wishlistItems?.map((wi) => 'id=' + wi.productId).join('&')
      : '?id=0';

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsInfoQuery(concatnatedProductsId);

  const productsWithLike = products?.map((p) => ({
    ...p,
    isLiked: true,
  }));

  return (
    <Container>
      <Heading title="Wishlist" />
      <Loading
        isLoading={wishlistLoading || productsLoading}
        error={wishlistError || productsError}
        type="product"
      >
        <GridList
          emptyMessage={'Your wishlist is empty'}
          records={productsWithLike ? productsWithLike : []}
          renderRecord={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Wishlist;
