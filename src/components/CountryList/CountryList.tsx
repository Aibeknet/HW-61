import React from 'react';
import { Country } from '../../types';

interface CountryListProps {
  countries: Country[];
  onCountrySelect: (alpha3Code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onCountrySelect }) => {
  return (
    <div className="overflow-auto" style={{ maxHeight: '400px' }}>
      <ul className="list-group">
        {countries.map((country) => (
          <li
            key={country.alpha3Code}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => onCountrySelect(country.alpha3Code)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              style={{ width: '30px', height: '20px', marginRight: '10px' }}
            />
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
