import React from 'react';
import numeral from 'numeraljs';

const Listing = ({ id, status, street, suburb, state, postcode, price, image }) => (
  <div data-testid={`property-${id}`}>
    <div>{status}</div>
    <div>{street}</div>
    <div>{suburb}</div>
    <div>{`${state} ${postcode}`}</div>
    <div>{numeral(price).format('$0,0[.]00')}</div>
    <img alt={`${street} ${suburb} ${state} ${postcode}`} src={image}></img>
  </div>
);

export default Listing;
