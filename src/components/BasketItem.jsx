import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart, removeFromCart } from '../app/basketSlice';
import { Card, Button, Col, Row } from 'react-bootstrap';

const BasketCard = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col md={4}>
          <div className="d-flex align-items-center justify-content-center" style={{ height: '100px', overflow: 'hidden' }}>
            <img
              src={cartItem.image}
              alt={cartItem.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
              className='p-2 mt-4'
            />
          </div>
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{cartItem.title}</Card.Title>
            <Card.Text className='text-truncate'>{cartItem.description}</Card.Text>
            <Button
              variant="danger"
              onClick={() => dispatch(removeFromCart(cartItem))}
            >
              Kaldır
            </Button>
          </Card.Body>
        </Col>
      </Row>
      <Card.Footer className="text-muted">
        <Row className="align-items-center justify-content-between">
          <Col md={4}>
            <span className="fw-bold" style={{ fontSize: '1.2em', color: '#333' }}>
              {cartItem.price} ₺
            </span>
          </Col>
          <Col md={5} className="d-flex align-items-center justify-content-center">
            <Button
              variant="outline-danger"
              onClick={() => dispatch(decreaseCart(cartItem))}
              style={{ fontSize: '1.2em', fontWeight: 'bold' }}
            >
              -
            </Button>
            <div className="mx-2" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
              {cartItem.cartQuantity}
            </div>
            <Button
              variant="outline-success"
              onClick={() => dispatch(addToCart(cartItem))}
              style={{ fontSize: '1.2em', fontWeight: 'bold' }}
            >
              +
            </Button>
          </Col>
          <Col md={3} className="text-end">
            <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#28a745' }}>
              {cartItem.price * cartItem.cartQuantity} ₺
            </span>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BasketCard;
