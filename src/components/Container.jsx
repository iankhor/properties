import React, { Fragment, useEffect } from 'react';
import useFetchProperties from 'hooks/useFetchProperties';
import useDataFilter from 'hooks/useDataFilter';
import Listing from 'components/Listing';

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
      {isError && <div>Uh oh. It looks like some things haven't loaded correctly</div>}
      {isError && <div data-testid="refetch" onClick={fetch}></div>}
    </Fragment>
  );
};

export default Container;
