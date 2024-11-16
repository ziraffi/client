import { useEffect, useMemo, useState, useCallback } from "react";

function IndianPincodesAdv() {
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [talukSearch, setTalukSearch] = useState("");
  const [branchOfficeSearch, setBranchOfficeSearch] = useState("");
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [indianData, setIndianData] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [isSearchingCountry, setIsSearchingCountry] = useState(false);
  const [isSearchingState, setIsSearchingState] = useState(false);
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [isSearchingDistrict, setIsSearchingDistrict] = useState(false);
  const [isSearchingTaluk, setIsSearchingTaluk] = useState(false);
  const [isSearchingOffice, setIsSearchingOffice] = useState(false);

  const [isIndianPlaces, setIsIndianPlaces] = useState(false);
  const [optimizedIndianData, setOptimizedIndianData] = useState({});

  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          countriesResponse,
          statesResponse,
          citiesResponse,
          indianDataResponse,
        ] = await Promise.all([
          fetch(
            "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries.json"
          ),
          fetch(
            "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/states.json"
          ),
          fetch(
            "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/cities.json"
          ),
          fetch("../assets/JSON/IndianPincodesData.json"),
        ]);

        const countriesData = await countriesResponse.json();
        const statesData = await statesResponse.json();
        const citiesData = await citiesResponse.json();
        const indianData = await indianDataResponse.json();

        setCountries(
          countriesData.map((country) => ({
            id: country.id,
            name: country.name,
          }))
        );
        setAllStates(statesData);
        setAllCities(citiesData);

        // Preprocess indianData
        const optimizedData = indianData.reduce((acc, item) => {
          const stateName = item.stateName
            .toLowerCase()
            .replace(/\./g, "")
            .trim();
          const districtName = item.districtName.trim().replace(/&/g, "and");
          const talukName = item.taluk.trim();

          if (!acc[stateName]) {
            acc[stateName] = {
              id: `state_${Object.keys(acc).length + 1}`,
              districts: {},
            };
          }

          if (!acc[stateName].districts[districtName]) {
            acc[stateName].districts[districtName] = {
              id: `district_${
                Object.keys(acc[stateName].districts).length + 1
              }`,
              taluks: {},
              offices: [],
            };
          }

          if (!acc[stateName].districts[districtName].taluks[talukName]) {
            acc[stateName].districts[districtName].taluks[talukName] = {
              id: `taluk_${
                Object.keys(acc[stateName].districts[districtName].taluks)
                  .length + 1
              }`,
            };
          }

          acc[stateName].districts[districtName].offices.push({
            id: `office_${
              acc[stateName].districts[districtName].offices.length + 1
            }`,
            officeName: item.officeName,
            pincode: item.pincode,
            taluk: talukName,
          });

          return acc;
        }, {});

        setIndianData(indianData);
        setOptimizedIndianData(optimizedData);
        console.log(
          "Data loaded - Countries:",
          countriesData.length,
          "No.States:",
          statesData.length,
          "No.Cities:",
          citiesData.length,
          "No.Indian Data:",
          indianData.length,
          "No.Optimized data:",
          optimizedData.length,
          "States:",
          statesData,
          "Cities loaded:",
          citiesData,

        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // In the useEffect for States
  useEffect(() => {
    if (selectedCountry) {
      if (selectedCountry.id == 101) {
        setIsIndianPlaces(true);
        const indianStates = Object.keys(optimizedIndianData).map(
          (stateName, index) => ({
            state_name: stateName,
            state_id: `IN_${index + 1}`,
          })
        );
        setStates(indianStates);
      } else {
        setIsIndianPlaces(false);
        const filteredStates = allStates
          .filter((state) => state.country_id === parseInt(selectedCountry.id))
          .map((state) => ({
            state_name: state.name,
            state_id: state.id,
          }));
        setStates(filteredStates);
      }
    } else {
      setStates([]);
    }
  }, [selectedCountry, allStates, optimizedIndianData]);
  // In the useEffect for cities
  useEffect(() => {
    if (selectedCountry && selectedState) {
      setIsLoadingCities(true);
      if (isIndianPlaces) {
        // For Indian cities, we don't need to do anything here
        // as we're handling districts and taluks separately
        setIsLoadingCities(false);
      } else {
        const filteredCities = allCities
          .filter(
            (city) =>
              city.country_id === parseInt(selectedCountry.id) &&
              city.state_id === parseInt(selectedState.state_id)
          )
          .map((city) => ({
            city_name: city.name,
            city_id: city.id,
          }));
        setCities(filteredCities);
        setIsLoadingCities(false);
      }
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState, allCities, isIndianPlaces]);

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
    if (!cities || cities.length === 0) {
      return [];
    }
    return cities.filter((city) =>
      city.city_name.toLowerCase().startsWith(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  const filteredDistricts = useMemo(() => {
    if (!selectedState) {
      return [];
    }
    const selectedStateName = selectedState.state_name
      .toLowerCase()
      .replace(/\./g, "")
      .trim();
    const districts = Object.keys(
      optimizedIndianData[selectedStateName]?.districts || {}
    );
    return districts.filter((district) =>
      district.toLowerCase().startsWith(districtSearch.toLowerCase())
    );
  }, [optimizedIndianData, selectedState, districtSearch]);

  const filteredTaluks = useMemo(() => {
    if (!selectedState || !districtSearch) return [];
    const selectedStateName = selectedState.state_name
      .toLowerCase()
      .replace(/\./g, "")
      .trim();
    const taluks = Object.keys(
      optimizedIndianData[selectedStateName]?.districts[districtSearch]
        ?.taluks || {}
    );
    return taluks.filter((taluk) =>
      taluk.toLowerCase().startsWith(talukSearch.toLowerCase())
    );
  }, [optimizedIndianData, selectedState, districtSearch, talukSearch]);

  {
    /* Searching in Branch Offices for Input field */
  }
  const filteredBranchOffices = useMemo(() => {
    if (!selectedState || !districtSearch || !talukSearch) return [];
    const selectedStateName = selectedState.state_name
      .toLowerCase()
      .replace(/\./g, "")
      .trim();
    const offices =
      optimizedIndianData[selectedStateName]?.districts[districtSearch]
        ?.offices || [];
    return offices
      .filter(
        (office) =>
          office.taluk.toLowerCase() === talukSearch.toLowerCase() &&
          office.officeName
            .toLowerCase()
            .startsWith(branchOfficeSearch.toLowerCase())
      )
      .map(({ officeName, pincode, id }) => ({ officeName, pincode, id }));
  }, [
    optimizedIndianData,
    selectedState,
    districtSearch,
    talukSearch,
    branchOfficeSearch,
  ]);

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setCountrySearch(country.name);
    setSelectedState(null);
    setStateSearch("");
    setCitySearch("");
    setCities([]);
    setIsSearchingCountry(false);
    setIsIndianPlaces(country.name === "India");
    if (country.name !== "India") {
      setDistrictSearch("");
      setTalukSearch("");
      setBranchOfficeSearch("");
      setPincodeSearch("");
    }
  }, []);

  const handleStateSelect = useCallback(
    (state) => {
      setSelectedState(state);
      setStateSearch(state.state_name);
      setCitySearch("");
      setIsSearchingState(false);

      if (isIndianPlaces) {
        setCitySearch("");
        setDistrictSearch("");
        setTalukSearch("");
        setBranchOfficeSearch("");
        setPincodeSearch("");
      } else {
        // Reset Indian-specific fields
        setDistrictSearch("");
        setTalukSearch("");
        setBranchOfficeSearch("");
        setPincodeSearch("");
      }
    },
    [isIndianPlaces]
  );

  const handleCitySelect = useCallback((city) => {
    setCitySearch(city.city_name);
    setIsSearchingCity(false);
  }, []);

  const handleDistrictSelect = useCallback((district) => {
    setDistrictSearch(district);
    // setSelectedDistrict(district);
    setIsSearchingDistrict(false);
    setTalukSearch("");
    setBranchOfficeSearch("");
    setPincodeSearch("");
  }, []);

  const handleTalukSelect = useCallback((taluk) => {
    setIsSearchingTaluk(false);
    setTalukSearch(taluk);
    setBranchOfficeSearch("");
    setPincodeSearch("");
  }, []);

  const handleBranchOfficeSelect = useCallback((office) => {
    setBranchOfficeSearch(office.officeName);
    setPincodeSearch(office.pincode.toString());
    setIsSearchingOffice(false);
  }, []);

  const handleSubmit = useCallback(() => {
    // Implement form submission logic here
    const formData = {
      country: selectedCountry?.name,
      state: selectedState?.state_name,
      ...(isIndianPlaces
        ? {
            district: districtSearch,
            taluk: talukSearch,
            branchOffice: branchOfficeSearch,
            pincode: pincodeSearch,
          }
        : {
            city: citySearch,
          }),
    };
    console.log("Form data:", formData);
    return formData;
  }, [
    selectedCountry?.name,
    selectedState?.state_name,
    isIndianPlaces,
    districtSearch,
    talukSearch,
    branchOfficeSearch,
    pincodeSearch,
    citySearch,
  ]);

  return (
    <div className="flex pt-20 pb-20 w-full justify-center">
      <div className="flex h-auto w-[400px] bg-white shadow-3xl rounded-[25px] p-8">
        <form action="/" className="flex flex-col w-full">
          <div className="flex flex-col gap-y-6">
            <div className="inline-flex gap-5">
              {/* Country Input */}
              <div className="relative">
                <label
                  htmlFor="country-search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                  placeholder="choose country"
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
                <label
                  htmlFor="state-search"
                  className="block text-sm font-medium text-gray-700 mb-1 "
                >
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
                    if (!e.target.value) {
                      setSelectedState(null);
                      setCities([]);
                      setDistrictSearch("");
                      setTalukSearch("");
                      setBranchOfficeSearch("");
                      setPincodeSearch("");
                    }
                  }}
                  onFocus={() => setIsSearchingState(true)}
                  placeholder="Choose state"
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
                        {state.state_name.charAt(0).toLowerCase() + state.state_name.slice(1).toLowerCase()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {isIndianPlaces ? (
              <>
                <div className="inline-flex gap-5">
                  {/* District Input */}
                  <div className="relative">
                    <label
                      htmlFor="district-search"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      District
                    </label>
                    <input
                      id="district-search"
                      type="text"
                      name="district"
                      value={districtSearch}
                      onChange={(e) => {
                        setDistrictSearch(e.target.value);
                        setIsSearchingDistrict(true);
                        if (!e.target.value) {
                          setDistrictSearch("");
                          setTalukSearch("");
                          setBranchOfficeSearch("");
                          setPincodeSearch("");
                        }
                      }}
                      onFocus={() => setIsSearchingDistrict(true)}
                      placeholder="Choose district"
                      disabled={!selectedState}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    {selectedState && isSearchingDistrict && (
                      <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredDistricts.map((district) => (
                          <li
                            key={district}
                            onClick={() => handleDistrictSelect(district)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {district}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Taluk Input */}
                  <div className="relative">
                    <label
                      htmlFor="taluk-search"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Taluk
                    </label>
                    <input
                      id="taluk-search"
                      type="text"
                      name="taluk"
                      value={talukSearch}
                      onChange={(e) => {
                        setTalukSearch(e.target.value);
                        setIsSearchingTaluk(true);
                        if (!e.target.value) {
                          setTalukSearch("");
                          setBranchOfficeSearch("");
                          setPincodeSearch("");
                        }
                      }}
                      onFocus={() => setIsSearchingTaluk(true)}
                      placeholder="Choose taluk"
                      disabled={!districtSearch}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    {districtSearch && isSearchingTaluk && (
                      <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredTaluks.map((taluk) => (
                          <li
                            key={taluk}
                            onClick={() => handleTalukSelect(taluk)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {taluk}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/* Branch Office Input */}
                <div className="relative">
                  <label
                    htmlFor="branch-office-search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Branch Office (Office Name)
                  </label>
                  <input
                    id="branch-office-search"
                    type="text"
                    name="branchOffice"
                    value={branchOfficeSearch}
                    onChange={(e) => {
                      setBranchOfficeSearch(e.target.value);
                      setIsSearchingOffice(true);
                      if (!e.target.value) {
                        setBranchOfficeSearch("");
                        setPincodeSearch("");
                      }
                    }}
                    onFocus={() => setIsSearchingOffice(true)}
                    placeholder="Choose branch office"
                    disabled={!talukSearch}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {talukSearch && isSearchingOffice && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredBranchOffices.map((office) => (
                        <li
                          key={office.id}
                          onClick={() => handleBranchOfficeSelect(office)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {office.officeName} - {office.pincode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Pincode Input */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    value={pincodeSearch}
                    onChange={(e) => {
                      setPincodeSearch(e.target.value);
                      if (!e.target.value) {
                        setPincodeSearch("");
                      }
                    }}
                    placeholder="Pincode"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </>
            ) : (
              // City Input for non-Indian places
              <div className="relative">
                <label
                  htmlFor="city-search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  id="city-search"
                  type="text"
                  name="city"
                  value={citySearch}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setIsSearchingCity(true);
                  }}
                  onFocus={() => setIsSearchingCity(true)}
                  placeholder="Choose city"
                  disabled={!selectedState}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {selectedState && isSearchingCity && !isLoadingCities && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <li
                          key={city.city_id}
                          onClick={() => handleCitySelect(city)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {city.city_name}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-500">
                        No cities found
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IndianPincodesAdv;
