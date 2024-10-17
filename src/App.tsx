import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList/CountryList';
import CountryInfo from './components/CountryInfo/CountryInfo';
import { Country } from './types';


const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all?fields=alpha3Code,name,flag');
        setCountries(response.data);
      } catch (error) {
        console.error('Error when getting the list of countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelect = (alpha3Code: string) => {
    setSelectedCountryCode(alpha3Code);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 sidebar">
          <h2>Country List</h2>
          <CountryList countries={countries} onCountrySelect={handleCountrySelect} />
        </div>
        <div className="col-md-8 content">
          {selectedCountryCode ? (
            <CountryInfo countryCode={selectedCountryCode} />
          ) : (
            <p>Select a country</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;


