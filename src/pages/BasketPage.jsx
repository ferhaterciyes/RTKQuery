import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTotals, clearCart } from "../app/basketSlice";
import BasketCard from "../components/BasketItem";
import { Container, Row, Col, Button } from 'react-bootstrap';

const BasketPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Alışveriş Sepeti</h2>
      {cart.products.length === 0 ? (
        <div className="text-center">
          <p>Sepetiniz şu anda boş</p>
          <Link to="/" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span className="ms-2">Alışverişe Başla</span>
          </Link>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <div className="cart-items">
              {cart.products?.map((cartItem) => (
                <BasketCard key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="cart-summary">
              <Button variant="danger" onClick={() => dispatch(clearCart())} className="mb-3">
                Sepeti Temizle
              </Button>
              <div className="subtotal mb-3">
                <span className="fw-bold">Toplam Tutar:</span>
                <span className="float-end">${cart.cartItemPrice}</span>
              </div>
              <p className="text-muted">Vergi ve kargo, ödeme sırasında hesaplanacaktır</p>
              <Button variant="primary" className="mt-3">Ödeme Yap</Button>
              <Link to="/" className="btn btn-secondary mt-3 d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span className="ms-2">Alışverişe Devam Et</span>
              </Link>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BasketPage;
