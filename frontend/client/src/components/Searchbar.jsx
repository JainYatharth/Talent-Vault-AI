import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search_icon from '../assets/search_icon.svg';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import CustomSelect from './CustomSelect';
import { useLocation } from 'react-router-dom';


const Searchbar = () => {
  const location = useLocation();

  const navigate = useNavigate(); // for navigating

  const [input, setInput] = useState('');// search bar data

  const [filter, setFilter] = useState(''); // filters that are selected by the client at the moment

  const [selectedFilters, setSelectedFilters] = useState({}); //filters obtained from the url, initially empty

  function getQueryFilters() {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);

    const newFilters = {};
    for (const [key, value] of queryParams.entries()) {
      newFilters[key] = value;
    }

    setSelectedFilters(newFilters); // set once after loop
  }
  const onSearchHandler = async (e) => {
    
    e.preventDefault(); // Always prevent default form submission

    if (filter === '') {
      toast.error('please select a filter', {
        autoClose: 1500,
      });
      return;
    }

    if (input.trim() === '') {
      toast.error('Search bar is empty!', {
        autoClose: 1500,
      });
      return;
    }

    if (Object.keys(selectedFilters).includes(filter.toLowerCase())) {
      toast.error('Filter already added', {
        autoClose: 1500,
      });
      return;
    }

    // Add the new filter to existing ones
    const newFilters = {
      ...selectedFilters,
      [filter.toLowerCase()]: input.trim()
    };

    setSelectedFilters(newFilters);

    // Build the query string
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      params.set(key, value);
    });

    // console.log('Setting search params:', newFilters);
    // console.log('URL params string:', params.toString());

    // Navigate with the updated search params
    navigate(`/search?${params.toString()}`);

    // Reset the form
    setInput('');
    setFilter('');
  };

  const typesOfFilters = ['name', 'contact no', 'email', 'country', 'city', 'primary skills', 'last organization'
    , 'secondary skills', 'education', 'specialization', 'years of experience', 'depatment', 'willing to relocate'
  ]

  useEffect(() => {
    getQueryFilters();
  }, [location.search])

  useEffect(() => {
    console.log("selectedFilters updated:", selectedFilters);
  }, [selectedFilters]);

  return (
    <div className='px-3 py-3 mt-4' >
      <div className='w-full flex items-center lg:justify-between h-12 mt-3 md:mt-0'>

        <div className='hidden lg:flex items-center'>
          <h4 className='text-gray-700'>List of Resumes</h4>
        </div>

        {/*Search bar*/}
        <div className='flex flex-wrap items-center gap-3 gap-y-2'>

          {/* Search input & button inside form */}
          <div>
            <form onSubmit={onSearchHandler} className='flex h-10 bg-white border border-gray-500/20 hover:border-gray-800 rounded'>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type='text'
                placeholder='Search'
                className='w-70 h-10 px-2 outline-none text-black-500/80 border-gray-300  '
              />
              <button
                type='submit'
                className='h-full rounded px-3 text-white w-10 flex items-center justify-center hover:cursor-pointer'
              >
                <img className='w-full' src={search_icon} alt='Search' />
              </button>
            </form>
          </div>

          {/* Dropdown beside the search form */}
          <div>
            <CustomSelect
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              options={typesOfFilters}
              label="Add Filter"
            />
          </div>

        </div>
      </div>

      {/* <hr className='mt-9'/> */}
      {/* Display selected filters as chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(selectedFilters).map(([key, value]) => (
          <Chip
            key={key}
            label={`${key}: ${value}`}
            onDelete={() => {
              const newFilters = { ...selectedFilters };
              delete newFilters[key];
              setSelectedFilters(newFilters);

              // Update URL
              const params = new URLSearchParams();
              Object.entries(newFilters).forEach(([k, v]) => {
                params.set(k, v);
              });
              navigate(`/search?${params.toString()}`);
            }}
            className="bg-blue-100"
          />
        ))}
      </div>
    </div>
  );
};

export default Searchbar;