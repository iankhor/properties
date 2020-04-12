import React from 'react';
import Listing from '../components/Listing';

const Listings = ({ listings }) => listings.map((property) => <Listing {...property} key={property.id} />);

export default Listings;
