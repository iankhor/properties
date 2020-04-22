import React, { useEffect, Fragment } from 'react';

import Listings from './Listings';
import Filter from './Filter';
import Loader from './Loader';
import Error from './Error';
import Layout from './Layout';

import useFetchProperties from 'hooks/useFetchProperties';
import useDataFilter from 'hooks/useDataFilter';

import containerStyles from 'styles/container.css';

const Container = (): JSX.Element => {
  const [{ isLoading, isSuccess, isError, data }, fetch] = useFetchProperties();
  const { data: filteredListings, filterBy } = useDataFilter();

  const showInitialListings = () => isSuccess && filterBy({ data, criteria: null });

  useEffect(() => void fetch(), []);
  useEffect(() => void showInitialListings(), [data, isSuccess]);

  return (
    <div role="main" className={containerStyles.container}>
      {isLoading && <Loader />}
      {isError && <Error fetch={fetch} />}
      {!isLoading && isSuccess && <Filter filterBy={filterBy} data={data} />}
      {isSuccess && (
        <Layout>
          <Listings listings={filteredListings} />
        </Layout>
      )}
    </div>
  );
};

export default Container;
