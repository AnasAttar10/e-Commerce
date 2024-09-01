import { LottieHandler } from '@components/feedback';
import { Col, Row } from 'react-bootstrap';

type IGridLis<T> = {
  records: T[];
  emptyMessage: string;
  renderRecord: (record: T) => React.ReactNode;
};
type IHasId = {
  id: string;
};
const GridList = <T extends IHasId>({
  records,
  renderRecord,
  emptyMessage,
}: IGridLis<T>) => {
  const recordsList =
    records.length > 0 ? (
      records?.map((r) => (
        <Col
          xs={3}
          key={r.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          {renderRecord(r)}
        </Col>
      ))
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );
  return <Row>{recordsList}</Row>;
};

export default GridList;
