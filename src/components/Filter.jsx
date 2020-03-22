import React from 'react';
import filterStyles from 'styles/filter.css';

const Filter = ({ filterBy, data }) => {
  const filter = ({ target: { value } }) => {
    // TODO: ugly. to refactor
    const criteria = !!value ? { status: value } : null;

    filterBy({ data, criteria });
  };
  return (
    <div className={filterStyles.filter}>
      <h1 className={filterStyles.title}>AP Property Listings</h1>
      <label htmlFor="filter" className={filterStyles.label}>
        Filter Status :
      </label>
      <select defaultValue="" id="filter" data-testid="filter" onChange={filter}>
        <option>Select a status</option>
        <option value="">All</option>
        <option value="sold">Sold</option>
        <option value="current">Current</option>
        <option value="off_market">Off Market</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
    </div>
  );
};

export default Filter;
