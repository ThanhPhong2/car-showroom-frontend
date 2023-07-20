import React from 'react';
import { Col } from "react-bootstrap";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
function Price(props) {
  function handleChangeBrand() {

  }
  return (
    // <>
    <div className='d-flex'>
      <Col md={4}>
        <p>
          <input
            type="text"
            placeholder="Min Price"
          />
        </p>
      </Col>
      <Col md={4}>
        <p>
          <input type="text" placeholder='Max Price' />
        </p>
      </Col>
      <Col md={4}>
        <p>
          <select placeholder="Choose City" onChange={handleChangeBrand}>
            <option key={0} value="">City</option>
            <option key={1} value="">Ha Noi</option>
            <option key={2} value="">Ho Chi Minh</option>
            <option key={3} value="">Da Nang</option>
          </select>
        </p>
      </Col>
    </div>

    // </>
  );
}

export default Price;