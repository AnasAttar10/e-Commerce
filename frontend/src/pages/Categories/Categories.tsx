import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import Category from '@components/eCommerce/Category/Category';
import Loading from '@components/feedback/Loading/Loading';
import { useGetCatgeoriesQuery } from '@store/Category/categoriesApi';
import { Container } from 'react-bootstrap';
const Categories = () => {
  const { data: records, isLoading, error } = useGetCatgeoriesQuery();

  return (
    <Container>
      <Heading title="Categories" />
      <Loading isLoading={isLoading} error={error} type="category">
        <GridList
          emptyMessage={'There Are No Categories'}
          records={records ? records : []}
          renderRecord={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
