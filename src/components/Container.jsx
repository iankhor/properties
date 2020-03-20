import React, { Fragment, useEffect } from 'react';
import useFetchProperties from 'hooks/useFetchProperties';
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

const Container = () => {
  const [{ isLoading, isSuccess, isError, data }, fetch] = useFetchProperties();

  useEffect(() => void fetch(), []);

  return (
    <Fragment>
      {isLoading && <p>Loading...</p>}
      {isSuccess && data.map(property => <Listing {...property} key={property.id} />)}
    </Fragment>
  );
};

export default Container;
