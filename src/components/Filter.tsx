import React from 'react';
import filterStyles from 'styles/filter.css';

import { Data } from 'hooks/useDataFilter';

type Criteria = {
  status: string;
};

type FilterData = {
  data: Data[];
  criteria?: string | Criteria | null; //TODO: refactor
};

type FilterProps = {
  data: Data[];
  filterBy: (args: FilterData) => void;
};

const Filter = ({ filterBy, data }: FilterProps): JSX.Element => {
  const filter = ({ target: { value } }) => {
    const criteria = value === 'all' ? null : { status: value }; //TODO: refactor

    filterBy({ data, criteria });
  };
  return (
    <div className={filterStyles.filter}>
      <h1 className={filterStyles.title}>AP Property Listings</h1>
      <label htmlFor="filter" className={filterStyles.label}>
        Filter Status :
      </label>
      <select defaultValue="" id="filter" data-testid="filter" onChange={filter}>
        <option value="all">All</option>
        <option value="sold">Sold</option>
        <option value="current">Current</option>
        <option value="off_market">Off Market</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
    </div>
  );
};

export default Filter;
