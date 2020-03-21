import React, { Fragment, useEffect } from 'react';

import Listings from 'components/Listings';
import Filter from 'components/Filter';
import Loader from 'components/Loader';
import Error from 'components/Error';

import useFetchProperties from 'hooks/useFetchProperties';
import useDataFilter from 'hooks/useDataFilter';

const Container = () => {
  const [{ isLoading, isSuccess, isError, data }, fetch] = useFetchProperties();
  const [filteredListings, filterBy] = useDataFilter();

  const showInitialListings = () => isSuccess && filterBy({ data });

  useEffect(() => void fetch(), []);
  useEffect(() => void showInitialListings(), [data, isSuccess]);

  return (
    <Fragment>
      <Filter filterBy={filterBy} data={data} />
      {isLoading && <Loader />}
      {isSuccess && <Listings listings={filteredListings} />}
      {isError && <Error fetch={fetch} />}
    </Fragment>
  );
};

export default Container;
