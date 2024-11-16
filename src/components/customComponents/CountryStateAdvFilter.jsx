import { useEffect, useMemo, useState, useCallback } from "react";

function CountryStateAdvFilter() {
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [isSearchingCountry, setIsSearchingCountry] = useState(false);
  const [isSearchingState, setIsSearchingState] = useState(false);
  const [isSearchingCity, setIsSearchingCity] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesResponse, statesResponse, citiesResponse] = await Promise.all([
          fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries.json"),
          fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/states.json"),
          fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/cities.json")
        ]);

        const countriesData = await countriesResponse.json();
        const statesData = await statesResponse.json();
        const citiesData = await citiesResponse.json();

        setCountries(countriesData.map(country => ({ id: country.id, name: country.name })));
        setAllStates(statesData);
        setAllCities(citiesData);

        console.log("Data loaded - Countries:", countriesData.length, "States:", statesData.length, "Cities:", citiesData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountry && allStates.length > 0) {
      const filteredStates = allStates
        .filter((state) => state.country_id === parseInt(selectedCountry.id))
        .map((state) => ({
          state_name: state.name,
          state_id: state.id,
        }));
      setStates(filteredStates);
    } else {
      setStates([]);
    }
  }, [selectedCountry, allStates]);

  useEffect(() => {
    if (selectedCountry && selectedState && allCities.length > 0) {
      const filteredCities = allCities
        .filter((city) => 
          city.country_id === parseInt(selectedCountry.id) && 
          city.state_id === parseInt(selectedState.state_id)
        )
        .map((city) => ({
          city_name: city.name,
          city_id: city.id,
        }));
      setCities(filteredCities);
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState, allCities]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().startsWith(countrySearch.toLowerCase())
    );
  }, [countries, countrySearch]);

  const filteredStates = useMemo(() => {
    return states.filter((state) =>
      state.state_name.toLowerCase().startsWith(stateSearch.toLowerCase())
    );
  }, [states, stateSearch]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.city_name.toLowerCase().startsWith(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setCountrySearch(country.name);
    setSelectedState(null);
    setStateSearch("");
    setSelectedCity(null);
    setCitySearch("");
    setIsSearchingCountry(false);
  }, []);

  const handleStateSelect = useCallback((state) => {
    setSelectedState(state);
    setStateSearch(state.state_name);
    setSelectedCity(null);
    setCitySearch("");
    setIsSearchingState(false);
  }, []);

  const handleCitySelect = useCallback((city) => {
    setSelectedCity(city);
    setCitySearch(city.city_name);
    setIsSearchingCity(false);
  }, []);

  return (
    <div className="flex pt-20 pb-20 h-dvh w-full justify-center">
      <div className="flex h-auto w-[400px] bg-white shadow-lg rounded-[25px] p-8">
        <form action="/" className="flex flex-col w-full">
          <div className="flex flex-col gap-y-6">
            {/* Country Input */}
            <div className="relative">
              <label htmlFor="country-search" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                id="country-search"
                name="countrySearch"
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setIsSearchingCountry(true);
                  if (!e.target.value) {
                    setSelectedCountry(null);
                    setStates([]);
                    setCities([]);
                  }
                }}
                onFocus={() => setIsSearchingCountry(true)}
                type="text"
                placeholder="Enter country name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isSearchingCountry && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCountries.map((country) => (
                    <li
                      key={country.id}
                      onClick={() => handleCountrySelect(country)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* State Input */}
            <div className="relative">
              <label htmlFor="state-search" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                id="state-search"
                type="text"
                name="states"
                value={stateSearch}
                onChange={(e) => {
                  setStateSearch(e.target.value);
                  setIsSearchingState(true);
                }}
                onFocus={() => setIsSearchingState(true)}
                placeholder="Enter state name"
                disabled={!selectedCountry}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {selectedCountry && isSearchingState && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredStates.map((state) => (
                    <li
                      key={state.state_id}
                      onClick={() => handleStateSelect(state)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {state.state_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* City Input */}
            <div className="relative">
              <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                id="city-search"
                type="text"
                name="cities"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setIsSearchingCity(true);
                }}
                onFocus={() => setIsSearchingCity(true)}
                placeholder="Enter city name"
                disabled={!selectedState}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {selectedState && isSearchingCity && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCities.map((city) => (
                    <li
                      key={city.city_id}
                      onClick={() => handleCitySelect(city)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {city.city_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Submit button clicked");
              console.log("Selected country:", selectedCountry);
              console.log("Selected state:", selectedState);
              console.log("Selected city:", selectedCity);
            }}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CountryStateAdvFilter;