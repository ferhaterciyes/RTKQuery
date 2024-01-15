import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItemCount } = useSelector((store) => store.cart);

  return (
    <Navbar bg="dark" variant="dark" className="navbar-form navbar-fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          E-Commerce
        </Navbar.Brand>
        <Nav className="ml-auto  ">
          <Nav.Link as={NavLink} to="/">
            Anasayfa
          </Nav.Link>
          <Nav.Link as={NavLink} to="/basket">
            Sepet{" "}
            <span className="order-count">
              {cartItemCount > 0 && (
                <span className="badge bg-danger">{cartItemCount}</span>
              )}
            </span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
