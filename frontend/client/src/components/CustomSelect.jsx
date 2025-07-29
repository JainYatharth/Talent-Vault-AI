import React, { useState } from 'react';
import caretDownSolid from '../assets/caret_down_solid.svg';

const CustomSelect = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    onChange(e);       // notify parent about new value
    setIsOpen(false);  // close dropdown, arrow rotates down
  };

  return (
    <div className="relative h-10 w-52">
      <select
        value={value}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}   // dropdown open
        onBlur={() => setIsOpen(false)}   // dropdown closed
        className="appearance-none h-10 w-full border border-gray-300 rounded px-2 text-gray-700 bg-white focus:outline-none focus:border-black hover:border-black"
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')}
          </option>
        ))}
      </select>

      <img
        src={caretDownSolid}
        alt="dropdown arrow"
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
          }`}
      />
    </div>
  );
};

export default CustomSelect;
