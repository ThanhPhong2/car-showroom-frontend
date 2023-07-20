import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaAngleDoubleRight, FaCar, FaCogs, FaTachometerAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
import './style.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actCarsFetchSearchAsync } from '../../store/car/actions';
import FormFindCarV2 from '../Findcar/FormFindCarV2';
import { actBrandsFetchAllAsync, actCarByBrandId } from '../../store/brand/actions';
import { brandService } from '../../services/brandService';

const CarList = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { search } = useLocation();
  const listSearch=useSelector((state)=>state.CAR.listSearch)
  const listBrands=useSelector((state)=>state.BRAND.list)
  const listCarByBrandId=useSelector((state)=>state.BRAND.listCar)
  console.log("listCarByBrandId",listCarByBrandId);
  console.log("searchParams",searchParams);
  const params = {};
  searchParams.forEach((value, key) => {
    params[key]=value;
  });
  console.log("params",params);
  console.log("searchhh",search);
  useEffect(() => {
    dispatch(actCarsFetchSearchAsync(params));
  }, [search])
  useEffect(()=>{
    dispatch(actBrandsFetchAllAsync());
  },[])

  function handleClick(e) {
    e.preventDefault();
    const id = e.target.value;
    // brandService.getAllWithCarByBrandId(id).then(res=>{
    //   dispatch(actCarByBrandId(res.data))
    // })
    navigate(`/car-listing?brandId=${id}`)
  }

  const handlePageClick = (e) => {
    e.preventDefault();
  };
  console.log('listSearch',listSearch);
  return (
    <section className="gauto-car-listing section_70">
      <Container>
        <Row>
          <Col lg={4}>
            <div className="car-list-left" style={{position:'sticky', top:'10px'}}>
              <div className="sidebar-widget croll">
                <FormFindCarV2 isShowForm/>
              </div>
              <div className="sidebar-widget">
                <ul className="service-menu">
                  {listBrands.map((brand) => (
                    <li key={brand.id} 
                    value={brand.id} onClick={handleClick}>{brand.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          {/* nên chia mỗi row thành 1 component */}
          <Col lg={8}>
            <div className="car-listing-right">
              <div className="car-grid-list">
              {listSearch.length===0&& <h1>No result</h1>}
                <Row>
                  {listSearch?.map((car)=>(
                    <Col md={6} key={car.id}>
                    <div className="single-offers">
                      <div className="offer-image">
                        <Link to="/product-single">
                          <img src={car.image} alt="offer 1" />
                        </Link>
                      </div>
                      <div className="offer-text">
                        <Link to="/car-booking">
                          <h3>
                            {car.carmodel.carModelName} - {car.id}
                          </h3>
                        </Link>
                        <h4>Price: {car.price}</h4>
                        <ul>
                          <li>
                            <FaCar />
                            {car.carmodel.yearOfManufacture}
                          </li>
                          <li>
                            <FaCogs />
                            {car.carattributes[1]?.attributeValue}
                          </li>
                          <li>
                            <FaTachometerAlt />
                            {car.carattributes[2]?.attributeValue}
                          </li>
                        </ul>
                        <div className="offer-action">
                          <Link to={`/product-single/${car.id}`} className="offer-btn-2">
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                  ))}
                </Row>
              </div>
              <div className="pagination-box-row">
                <p>Page 1 of 6</p>
                <ul className="pagination">
                  <li className="active">
                    <Link to="/" onClick={handlePageClick}>
                      1
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handlePageClick}>
                      2
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handlePageClick}>
                      3
                    </Link>
                  </li>
                  <li>...</li>
                  <li>
                    <Link to="/" onClick={handlePageClick}>
                      6
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handlePageClick}>
                      <FaAngleDoubleRight />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarList;
