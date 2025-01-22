import React, { useContext, useState } from 'react';
import { ReceipeDataContext } from '../context/ReceipeContext.jsx';

const FilterButtons = ({name}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const {
    getAllFavoriteItems,
    favoriteItems,
  } = useContext(ReceipeDataContext);

  const filters = name.map((item) => item.name);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    getAllFavoriteItems(filter.trim()==""?"all":filter);
  };

  return (
    <div className="flex gap-4 p-5">
      {name.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.name)}
          className={`
            px-6 py-2 
            rounded-full 
            border-2 
            border-blue-500 
            transition-all 
            duration-300 
            focus:outline-none
            capitalize
            ${
              activeFilter === filter.name
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 hover:bg-blue-50'
            }
          `}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
