import React, { Fragment, useEffect } from 'react';
import useFetchProperties from 'hooks/useFetchProperties';
import useDataFilter from 'hooks/useDataFilter';
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
  const [filteredData, filterBy] = useDataFilter();

  useEffect(() => void fetch(), []);
  useEffect(() => {
    isSuccess && filterBy({ data });
  }, [data, isSuccess]);

  const filter = ({ target: { value } }) => {
    // TODO: ugly. to refactor
    const criteria = !!value ? { status: value } : null;

    filterBy({ data, criteria });
  };

  return (
    <Fragment>
      <select data-testid="filter" onChange={filter}>
        <option value="">All</option>
        <option value="sold">Sold</option>
        <option value="current">Current</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {isSuccess && filteredData.map(property => <Listing {...property} key={property.id} />)}
    </Fragment>
  );
};

export default Container;
