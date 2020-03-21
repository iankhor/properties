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
      <div className={filterStyles.title}>AP Property Listings</div>
      <label className={filterStyles.label}>Status :</label>
      <select defaultValue="" data-testid="filter" onChange={filter}>
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
