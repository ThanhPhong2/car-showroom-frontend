import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaStar,
  FaStarHalf,
  FaTwitter,
} from "react-icons/fa";
import "./style.css";
import { CARS } from "../../mock/Car";
import { useDispatch, useSelector } from 'react-redux';
import { actFetchBookingCars, actFetchCars, actFetchCarsAsync } from "../../store/car/actions";
import moment from "moment/moment";
import { bookService } from "../../services/bookService";
import Moment from 'moment';
const ProductDetails = () => {
  const param = useParams();
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.USER.currentUser)
  console.log("currentUser", currentUser);
  const [isImage, setIsImage] = useState(null);
  const [dateTime, setDateTime] = useState(null)
  const [day,setDay]=useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
  

  console.log(param);
  const carDetail = useSelector((state) => state.CAR.carDetail);
  const [form,setForm]= useState({
    id: +param.id,
    date:null,
    timeSlot:null
  })
  
  console.log("carDetail", carDetail?.id);
  const navigate = useNavigate()
  const book = {
    img: carDetail?.img,
    price: carDetail?.price,
    price: carDetail?.price,
    date: dateTime?.date,
    time: dateTime?.time
  }

  console.log("book", book);
  const onClick = (e => {
    e.preventDefaul();
  });

  useEffect(() => {
    dispatch(actFetchCarsAsync(param.id))
  }, [param.id])
  console.log("formmm",form);
  console.log(day);
  function handleChangeDate(e) {
    console.log(e.target.value);
    const formattedDate = Moment(e.target.value).format("YYYY-MM-DD");
    setForm({...form,
      date:formattedDate
    })
  }
  function handleChangeTime(e){
    const time=+e.target.value
    setForm({...form,
    timeSlot:time
  })
  }
  
  function handleClick() {
    if (currentUser === null) {
      alert('You can to login')
      navigate('/login')
    } else {
      // dispatch(actFetchBookingCars(book))
      // bookService.getBook(form).then(res=>{
      //   alert("Add submit")
      // })
      dispatch(actFetchBookingCars(book))
      navigate("/cart")
    }
  }
  return (
    <>
      <section className="gauto-product-details section_70">
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <div className="product-details-image">
                <img src={carDetail?.image} alt="product" />
              </div>
              <div className="image-description">
                <a href="#popup1" onClick={() => setIsImage(carDetail?.image)}><img src={carDetail?.image} alt="product" /></a>
                <a href="#popup1" onClick={() => setIsImage(carDetail?.image)}><img src={carDetail?.image} alt="product" /></a>
                <a href="#popup1" onClick={() => setIsImage(carDetail?.image)}><img src={carDetail?.image} alt="product" /></a>
                <a href="#popup1" onClick={() => setIsImage(carDetail?.image)}><img src={carDetail?.image} alt="product" /></a>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="product-details-text">
                <h3>{carDetail?.type}</h3>
                <div className="car-rating">
                  <ul>
                    <li>
                      Name: {carDetail?.carmodel.carModelName}
                    </li>
                    <li>
                      {/* {carDetail?.attribute.attributeName}: {carDetail?.attribute.attributeValue} */}
                      {carDetail?.carattributes.map((e)=>(
                        <li>
                        {e.attribute?.attributeName}: {e.attributeValue}
                        </li>
                      ))}
                    </li>
                    <li>
                      {carDetail?.showroom.area}: {carDetail?.showroom.address}
                    </li>
                    <li>
                      Status: {carDetail?.status}
                    </li>
                    <li>
                      <FaStarHalf />
                    </li>
                  </ul>
                  <p>123 rating</p>
                </div>
                {/* <div className="single-pro-page-para">
                  <p>
                    {carDetail?.desc}
                  </p>
                </div> */}
                <div className="single-shop-price">
                  <p>
                    Price: <span>{carDetail?.price}</span>
                  </p>
                  <p style={{ width: "120px" }}><DatePickerComponent min={day} onChange={handleChangeDate} name="date" value='' placeholder="Choice date" /></p>
                  <select placeholder="Choice timeSlot" name="timeSlot" onClick={handleChangeTime}>
                    <option key={0} value="">TimeSlot:</option>
                    <option key={1} value="1">7am-9am</option>
                    <option key={2} value="2">9am-11am</option>
                    <option key={3} value="3">1pm-3pm</option>
                    <option key={4} value="4">3pm-5pm</option>
                  </select>
                  {/* <p style={{ width: "120px" }}><TimePickerComponent name="time" value={"Choice time"} onChange={handleChange} /></p> */}
                  
                </div>
                <div className="single-shop-page-btn">
                  {/* <Link to="/cart" className="gauto-btn" onClick={handleClick}>
                    <FaShoppingCart />
                    add_to_booking
                  </Link> */}
                  <a className="gauto-btn" onClick={handleClick}>
                    <FaShoppingCart />
                    add_to_booking
                  </a>
                  {/* <ul>
                    <li>
                      <Link to="/" onClick={onClick}>
                        <FaFacebook />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={onClick}>
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={onClick}>
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div id="popup1" className="overlay">
          <div className="popup">
            <a className="close" href="#">&times;</a>
            <p>{isImage}aaa</p>
            <img />
          </div>
        </div>
      </section>
      {/* <section className="gauto-related-products section_b_70">
        <Container>
          <Row>
            <Col md={12}>
              <div className="site-heading">
                <h4>{"products"}</h4>
                <h2>{"related_products"}</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product1} alt="product 1" />
                  </Link>
                </div>
                <div className="product-text">
                  <div className="product-title">
                    <h3>
                      <Link to="/product-single">Car disk brake</Link>
                    </h3>
                    <p>$80.00</p>
                  </div>
                  <div className="product-action">
                    <Link to="/product-single">
                      <FaShoppingCart />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product2} alt="product 1" />
                  </Link>
                </div>
                <div className="product-text">
                  <div className="product-title">
                    <h3>
                      <Link to="/product-single">car battery</Link>
                    </h3>
                    <p>$180.00</p>
                  </div>
                  <div className="product-action">
                    <Link to="/product-single">
                      <FaShoppingCart />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product3} alt="product 1" />
                  </Link>
                </div>
                <div className="product-text">
                  <div className="product-title">
                    <h3>
                      <Link to="/product-single">steering wheel</Link>
                    </h3>
                    <p>$132.00</p>
                  </div>
                  <div className="product-action">
                    <Link to="/product-single">
                      <FaShoppingCart />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div className="product-item">
                <div className="product-image">
                  <Link to="/product-single">
                    <img src={product2} alt="product 1" />
                  </Link>
                </div>
                <div className="product-text">
                  <div className="product-title">
                    <h3>
                      <Link to="/product-single">car battery</Link>
                    </h3>
                    <p>$132.00</p>
                  </div>
                  <div className="product-action">
                    <Link to="/product-single">
                      <FaShoppingCart />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
    </>
  );
};

export default ProductDetails;
