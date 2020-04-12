import React from 'react';
import numeral from 'numeraljs';
import listingStyles from 'styles/listing.css';

import { snakeCaseToTitleCase } from 'lib/utils';

const statusColours = {
  current: 'green',
  sold: 'red',
  off_market: 'orange',
  withdrawn: 'grey',
};

type ListingProps = {
  id: string;
  status: string;
  suburb: string;
  state: string;
  street: string;
  postcode: string;
  price: string;
  image: string;
};

const Listing = ({ id, status, street, suburb, state, postcode, price, image }: ListingProps): JSX.Element => (
  <div className={listingStyles.listing} data-testid={`property-${id}`}>
    <div>{numeral(price).format('$0,0[.]00')}</div>
    <div>
      <div className={listingStyles.status}>{snakeCaseToTitleCase(status)}</div>
      <span className={`${listingStyles.dot} ${listingStyles[statusColours[status]]}`}></span>
    </div>
    <img className={listingStyles.row} alt={`${street} ${suburb} ${state} ${postcode}`} src={image}></img>
    <div className={listingStyles.row}>{street}</div>
    <div className={listingStyles.row}>{suburb}</div>
    <div className={listingStyles.row}>{`${state} ${postcode}`}</div>
  </div>
);

export default Listing;
