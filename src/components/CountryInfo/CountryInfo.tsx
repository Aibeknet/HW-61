import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../constants';

interface CountryDetail {
  name: string;
  population: number;
  capital: string;
  borders: string[];
  flag: string;
}

interface BorderCountry {
  name: string;
}

interface CountryInfoProps {
  countryCode: string;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ countryCode }) => {
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(API_URLS.COUNTRY_INFO(countryCode));
        const data = response.data;
        setCountry(data);

        if (data.borders && data.borders.length > 0) {
          const borderResponse = await axios.get(API_URLS.BORDER_COUNTRIES(data.borders));
          setBorderCountries(borderResponse.data.map((borderCountry: BorderCountry) => borderCountry.name));
        } else {
          setBorderCountries([]);
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (!country) {
    return <p>Loading country information...</p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 className="#" style={{ margin: 0 }}>{country.name}</h2>
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
          />
        </div>
        <hr />
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <hr />
        <p><strong>Borders with:</strong></p>
        <ul>
          {borderCountries.length > 0 ? (
            borderCountries.map((borderCountry, index) => (
              <li key={index}>{borderCountry}</li>
            ))
          ) : (
            <li>No neighbors</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountryInfo;
//card-title