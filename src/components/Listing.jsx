import React from 'react';
import numeral from 'numeraljs';
import listingStyles from 'styles/listing.css';

const Listing = ({ id, status, street, suburb, state, postcode, price, image }) => (
  <div className={listingStyles.listing} data-testid={`property-${id}`}>
    <div>{status}</div>
    <div>{numeral(price).format('$0,0[.]00')}</div>
    <img alt={`${street} ${suburb} ${state} ${postcode}`} src={image}></img>
    <div>{street}</div>
    <div>{suburb}</div>
    <div>{`${state} ${postcode}`}</div>
  </div>
);

export default Listing;
