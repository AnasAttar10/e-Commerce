import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import Product from '@components/eCommerce/Product/Product';
import Loading from '@components/feedback/Loading/Loading';
import { useAppSelector } from '@store/hooks';
import { useGetProductsQuery } from '@store/Product/productsApi';
import { useGetWishlistItemsQuery } from '@store/wishlist/wishlishApi';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Products = () => {
  const params = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const {
    error,
    isLoading,
    data: products,
  } = useGetProductsQuery(params.prefix as string);

  const { data: wishlistItems } = useGetWishlistItemsQuery(user.id);
  const wishlistProductsArr = wishlistItems?.map((wi) => wi.productId);
  const productsWithLike = products?.map((p) => ({
    ...p,
    isLiked: wishlistProductsArr?.includes(p.id),
  }));
  return (
    <Container>
      <Heading title={`${params.prefix} Products`} />
      <Loading isLoading={isLoading} error={error} type="product">
        <GridList
          emptyMessage={'There Are No Products'}
          records={productsWithLike ? productsWithLike : []}
          renderRecord={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
