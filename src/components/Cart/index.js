import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "./style.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const { t } = useTranslation();
  const currentUser = useSelector(state => state.USER.currentUser);
 
  let books=JSON.parse(localStorage.getItem('Book'))
  
  const onClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className="gauto-cart-page-area section_70">
      <Container>
        <Row>
          <Col lg={8} md={7}>
            <div className="cart-table-left">
              <h3>shopping_booking</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>cart.preview</th>
                      <th>cart.product</th>
                      <th>cart.price</th>
                      <th>cart.phone</th>
                      {/* <th>cart.total</th> */}
                      <th>cart.action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser&& books?.map((book)=>(
                      <tr className="shop-cart-item">
                      <td className="gauto-cart-preview">
                        <Link to="/product-single">
                          <img src={book.img} alt="cart-1" />
                        </Link>
                      </td>
                      <td className="gauto-cart-product">
                        <Link to="/product-single">
                          <p>{book.price}</p>
                        </Link>
                      </td>
                      <td className="gauto-cart-price">
                        <p>{book.price}</p>
                      </td>
                      {/* <td className="gauto-cart-quantity">
                        <input type="number" defaultValue={1} />
                      </td> */}
                      <td className="gauto-cart-total">
                        <p>{book.price}</p>
                      </td>
                      <td className="gauto-cart-close">
                        <Link to="/" onClick={onClick}>
                          <FaTimes />
                        </Link>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-clear">
                <Link to="/" onClick={onClick}>
                  {t("cart.clear_cart")}
                </Link>
                <Link to="/" onClick={onClick}>
                  {t("cart.update_cart")}
                </Link>
              </div>
            </div>
          </Col>
          {/* <Col lg={4} md={5}>
            <div className="order-summury-box">
              <h3>{t("cart.summury")}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>{t("cart.subtotal")}</td>
                    <td>$270</td>
                  </tr>
                  <tr>
                    <td>{t("cart.shipping")}</td>
                    <td>{t("cart.free_shipping")}</td>
                  </tr>
                  <tr>
                    <td>{t("cart.order_total")}</td>
                    <td>$270</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout-action">
              <Link to="/checkout" className="gauto-btn">
                {t("cart.proceed")}
              </Link>
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
