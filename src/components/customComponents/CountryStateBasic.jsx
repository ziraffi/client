import { useEffect, useState } from "react";

function CountryStateBasic() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [allStates, setAllStates] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedCountries = data.map(country => ({
          id: country.id,
          name: country.name.toLowerCase()
        }));
        setCountries(updatedCountries);
        console.log("fetched countries:", updatedCountries);
        // After countries are fetched, fetch all states
        return fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/states.json");
      })
      .then((response) => response.json())
      .then((data) => {
        setAllStates(data);
        console.log("fetched all states:", data);
      })      .catch((error) => console.error("Error:", error));
  }, []); // Only fetch countries once

  useEffect(() => {
    if (selectedCountry && allStates.length > 0) {

          const filteredStates = allStates
            .filter((state) => state.country_id === parseInt(selectedCountry.id))
            .map((state) => ({
              state_name: state.name.toLowerCase(),
              state_id: state.id
            }));
          setStates(filteredStates);
    } else {
      setStates ([]);
    }

  }, [selectedCountry, allStates]);

  const handleCountryChange = (e) => {
    const selectedId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
    const choosenCountry = {
      id: selectedId,
      name: e.target.value
    };
    setSelectedCountry(choosenCountry);
    console.log("Selected country:", choosenCountry);
    setSelectedState("");
  };
  const hadleStateChange = (e) => {
    const selectedSId= e.target.options[e.target.selectedIndex].getAttribute('data-id');
    const choosenState = {
      id: selectedSId,
      name: e.target.value
    }
    setSelectedState(choosenState);
    console.log("Selected state:", choosenState);
  }
  return (
    <div className="flex pt-20 pb-20 h-dvh w-full justify-center">
      <div className="flex h-[300px] w-[400px] backdrop-brightness-90 rounded-[25px] place-items-center place-content-center">
        <form action="/" className="flex flex-col">
          <div className="flex flex-col gap-y-4">
            <label htmlFor="countries">Country</label>
            <select
              id="countries"
              name="countries"
              value={selectedCountry ? selectedCountry.name : ""}
              onChange={handleCountryChange}
            >
              <option disabled value="">
                Select a country
              </option>
              {countries.map((country, index) => (
                <option key={country.id} value={country.name} data-id={country.id}>
                  {`${index + 1}. ${country.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="states">State</label>
            <select
              id="states"
              name="states"
              value={selectedState}
              onChange={ hadleStateChange }
            >
              <option value="">Select a state</option>
              {states.map((state, index) => (                
                <option key={state.state_id} value={state.state_name} data-id= {state.state_id}>
                  {`${index + 1}. ${state.state_name}`}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(
                `Selected country: ${selectedCountry?.name}, Selected state: ${selectedState}`
              );
            }}
            className="py-5 self-center"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CountryStateBasic;