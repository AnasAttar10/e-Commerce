import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import CartSkeleton from '../Skeletons/CartSkeleton/CartSkeleton';
import ProductSkeleton from '../Skeletons/ProductSkeleton/ProductSkeleton';
import CategorySkeleton from '../Skeletons/CategorySkeleton/CategorySkeleton';
import TableSkeleton from '../Skeletons/TableSkeleton/TableSkeleton';
import LottieHandler from '../LottieHandler/LottieHandler';
type ApiError = FetchBaseQueryError | SerializedError | undefined;
const skeletons = {
  cart: CartSkeleton,
  product: ProductSkeleton,
  category: CategorySkeleton,
  table: TableSkeleton,
};
interface ILoading {
  isLoading: boolean;
  error: ApiError;
  children: React.ReactNode;
  type?: keyof typeof skeletons;
}

const Loading = ({
  isLoading,
  error,
  children,
  type = 'category',
}: ILoading) => {
  const Component = skeletons[type];
  if (isLoading) {
    return <Component />;
  }
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);

      return <LottieHandler type="error" message={errMsg} />;
    }
    // you can access all properties of `SerializedError` here
    return <div>{error.message}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
