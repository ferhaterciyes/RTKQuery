import { useDispatch } from "react-redux";
import { addToCart } from "../app/basketSlice";

const Cart = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card shadow" style={{ width: "14rem", height: "20rem", borderRadius: "15px" }}>
      <div className="position-relative overflow-hidden rounded-top">
        <img
          src={product.image}
          className="card-img-top p-4"
          alt={product.title}
          style={{ objectFit: "contain", height: "150px" }}
        />
        <div className="badge bg-info position-absolute top-0 end-0 m-2">
          {product.category}
        </div>
      </div>
      <div className="card-body">
        <h6 className="card-title text-truncate mb-2">{product.title}</h6>
        <p className="fw-bold mb-3 text-muted text-truncate">{product.description}...</p>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <button onClick={() => dispatch(addToCart(product))} className="btn btn-success btn-sm mb-2">
            Sepete Ekle
          </button>
          <span className="text-danger fw-bold">{product.price}₺</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
