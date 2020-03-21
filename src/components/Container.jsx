import React, { useEffect, Fragment } from 'react';

import Listings from 'components/Listings';
import Filter from 'components/Filter';
import Loader from 'components/Loader';
import Error from 'components/Error';
import Layout from 'components/Layout';

import useFetchProperties from 'hooks/useFetchProperties';
import useDataFilter from 'hooks/useDataFilter';

import containerStyles from 'styles/container.css';

const Container = () => {
  const [{ isLoading, isSuccess, isError, data }, fetch] = useFetchProperties();
  const [filteredListings, filterBy] = useDataFilter();

  const showInitialListings = () => isSuccess && filterBy({ data });

  useEffect(() => void fetch(), []);
  useEffect(() => void showInitialListings(), [data, isSuccess]);

  return (
    <div className={containerStyles}>
      <Filter filterBy={filterBy} data={data} />
      {isLoading && <Loader />}
      {isError && <Error fetch={fetch} />}
      <Layout>{isSuccess && <Listings listings={filteredListings} />}</Layout>
    </div>
  );
};

export default Container;
