import { Heading } from '@components/common';
import { Product } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import ModalB from '@components/feedback/Modal/ModalB';
import { useAppSelector } from '@store/hooks';
import { useGetOrdersQuery } from '@store/order/orderApi';
import { IProduct } from '@types';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

const Order = () => {
  const [show, setShow] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [selectedItems, setSelectedItems] = useState<IProduct[]>([]);
  const { data, isLoading, error } = useGetOrdersQuery(user.id);
  const modalMessage = selectedItems.map((el) => (
    <div style={{ marginBottom: '10px' }}>
      <Product
        key={el.id}
        id={el.id}
        title={el.title}
        img={el.img}
        price={el.price}
        quantity={el.quantity}
        showButton={false}
        showLikeIcon={false}
        showReachedMaxMessage={false}
        showQuantity={true}
      />
    </div>
  ));

  const handleViewOrder = (id: string) => {
    const selectedProducts = data && data?.find((el) => el.id === id)?.items;
    setSelectedItems(selectedProducts ?? []);
    setShow(true);
  };
  return (
    <>
      <ModalB
        title="Products Details"
        show={show}
        handleClose={() => setShow(false)}
        handleSave={() => console.log('anas')}
        message={modalMessage}
        showButtons={false}
        heihgt="70vh"
      />
      <Heading title="My Order" />
      <Loading isLoading={isLoading} error={error} type="table">
        <Table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((el) => (
                <tr key={el.id}>
                  <td>#{el.id}</td>
                  <td>
                    {el.items.length} item(s)
                    {' / '}
                    <span
                      onClick={() => handleViewOrder(el.id)}
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Products Details
                    </span>
                  </td>
                  <td>{el.subtotal.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Order;
