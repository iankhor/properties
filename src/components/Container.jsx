import React, { useEffect } from 'react';

import Listings from 'components/Listings';
import Filter from 'components/Filter';
import Loader from 'components/Loader';
import Error from 'components/Error';
import Layout from 'components/Layout';

import useFetchProperties from 'hooks/useFetchProperties';
import useDataFilter from 'hooks/useDataFilter';

const Container = () => {
  const [{ isLoading, isSuccess, isError, data }, fetch] = useFetchProperties();
  const [filteredListings, filterBy] = useDataFilter();

  const showInitialListings = () => isSuccess && filterBy({ data });

  useEffect(() => void fetch(), []);
  useEffect(() => void showInitialListings(), [data, isSuccess]);

  return (
    <Layout>
      <Filter filterBy={filterBy} data={data} />
      {isLoading && <Loader />}
      {isSuccess && <Listings listings={filteredListings} />}
      {isError && <Error fetch={fetch} />}
    </Layout>
  );
};

export default Container;
