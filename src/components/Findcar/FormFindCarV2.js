import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Price from './Price';
import { actBrandsFetchAllAsync } from '../../store/brand/actions';
import { actModelsFetchAllByBrand, actModelsFetchAllByBrandAsync } from '../../store/model/actions';
import { actShowroomsFetchAllAsync } from '../../store/showroom/actions';

function FormFindCarV2(props) {
  const { isShowForm, brandID, modelId } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const showrooms = useSelector((state) => state.SHOWROOM.list)
  // console.log("showrooms", showrooms);
  const [formData, setFormData] = useState({
    brandId: searchParams.get('brandId'),
    modelId: searchParams.get('modelId'),
    area: searchParams.get('area'),
    minPrice: searchParams.get('minPrice'),
    maxPrice: searchParams.get('maxPrice')
  })

  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.BRAND.list);
  const modelsByBrand = useSelector((state) => state.MODEL.listByBrand);
  const SubmitHandler = (e) => {
    e.preventDefault();
    const sendData = {}
    for (const property in formData) {
      if (formData[property]) {
        sendData[property] = formData[property]
      }
    }
    console.log("sendData",sendData);
    const queryString = new URLSearchParams(sendData).toString()
    console.log(queryString);
    navigate(`/car-listing?${queryString}`);
  };

  useEffect(() => {
    dispatch(actBrandsFetchAllAsync());
    dispatch(actShowroomsFetchAllAsync());
  }, []);
  useEffect(() => {
    if (formData.brandId) {
      dispatch(actModelsFetchAllByBrandAsync(formData.brandId))
    }
    setFormData({ ...formData, modelId: null })
  }, [formData.brandId])

  console.log("formData",formData);
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <form onSubmit={SubmitHandler}>
      <Row>
        <Col md={4}>
          <p>
            <select value={formData.brandId||0} name='brandId' placeholder="Choose Brand" onChange={handleChange}>
              <option key={0} value="">
                Brand
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </p>
        </Col>
        <Col md={4}>
          <p  style={{width:'100px'}}>
            <select value={formData.modelId||0} name='modelId' placeholder="Choose Model" onChange={handleChange}>
              <option key={0} value="">
                Model
              </option>
              {modelsByBrand?.carmodels?.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.carModelName}
                </option>
              ))}
            </select>
          </p>
        </Col>
        {isShowForm && <div className='d-flex'>
          <Col md={4}>
            <p>
              <input
                value={formData.minPrice}
                name='minPrice'
                type="text"
                placeholder="Min Price"
                onChange={handleChange}
              />
            </p>
          </Col>
          <Col md={4}>
            <p>
              <input
                value={formData.maxPrice}
                name='maxPrice'
                type="text" placeholder='Max Price'
                onChange={handleChange}
              />
            </p>
          </Col>
          <Col md={4}>
            <p>
              <select
                value={formData.area||0}
                name='area'
                placeholder="Choose City" onChange={handleChange}>
                <option key={0} value="">City</option>
                {showrooms.map((showroom) => (
                  <option key={showroom.id}>{showroom.area}</option>
                ))}
              </select>
            </p>
          </Col>
        </div>}
        {show && (
          <Col md={4}>
            <p>
              <button type="submit" className="gauto-theme-btn">
                Find Car
              </button>
            </p>
          </Col>
        )}
      </Row>
    </form>
  );
}

export default FormFindCarV2;
