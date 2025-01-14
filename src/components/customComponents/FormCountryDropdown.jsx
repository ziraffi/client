import { useState, useRef, useEffect } from "react";
import { useMemo, useCallback, Suspense } from "react";
import DOMPurify from "dompurify";
import ResubmitModal from "./ResubmitModal";
import indianJsonData from "/assets/JSON/IndianPincodesData.json?url";

function FormCountryDropdown() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [errors, setErrors] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedBranchOffice, setSelectedBranchOffice] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);

  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [talukSearch, setTalukSearch] = useState("");
  const [branchOfficeSearch, setBranchOfficeSearch] = useState("");
  const [pincodeSearch, setPincodeSearch] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  // const [indianData, setIndianData] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [isSearchingCountry, setIsSearchingCountry] = useState(false);
  const [isSearchingState, setIsSearchingState] = useState(false);
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [isSearchingDistrict, setIsSearchingDistrict] = useState(false);
  const [isSearchingTaluk, setIsSearchingTaluk] = useState(false);
  const [isSearchingOffice, setIsSearchingOffice] = useState(false);
  const [isEnteringPhone, setIsEnteringPhone] = useState(false);
  const [isEnteringMail, setIsEnteringMail] = useState(false);
  const [isEnteringAddress, setIsEnteringAddress] = useState(false);
  const [isEnteringLandmark, setIsEnteringLandmark] = useState(false);
  const [typingFname, setIsTypingFname] = useState(false);
  const [typingLname, setIsTypingLname] = useState(false);

  const [isIndianPlaces, setIsIndianPlaces] = useState(false);
  const [optimizedIndianData, setOptimizedIndianData] = useState({});

  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const fNameInputRef = useRef(null);
  const lNameInputRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const districtDropdownRef = useRef(null);
  const talukDropdownRef = useRef(null);
  const branchOfficeDropdownRef = useRef(null);
  const phoneInputRef = useRef(null);
  const mailInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const landmarkInputRef = useRef(null);

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResubmitModal, setShowResubmitModal] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const logArr = [
      { field: "firstName", value: typingFname },
      { field: "lastName", value: typingLname },
      { field: "email", value: isEnteringMail },
      { field: "phoneNumber", value: isEnteringPhone },
      { field: "country", value: isSearchingCountry },
      { field: "state", value: isSearchingState },
      { field: "city", value: isSearchingCity },
      { field: "addressLine", value: isEnteringAddress },
      { field: "landmark", value: isEnteringLandmark },
    ];
    if (isIndianPlaces && optimizedIndianData.length > 0) {
      logArr.splice(6, 1);
      logArr.push(
        { field: "district", value: isSearchingDistrict },
        { field: "taluk", value: isSearchingTaluk },
        { field: "office", value: isSearchingOffice }
      );
    }

    // const checkFalse
    logArr.forEach((value, index) => {
      if (value.value) {
        console.log(`${index + 1}. ${value.field}  :`, value.value);
      }
    });
  }, [
    isSearchingCountry,
    isSearchingState,
    isSearchingCity,
    isSearchingDistrict,
    isSearchingTaluk,
    isSearchingOffice,
    isEnteringPhone,
    isEnteringMail,
    isEnteringAddress,
    isEnteringLandmark,
    typingFname,
    typingLname,
    isIndianPlaces,
    optimizedIndianData.length,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fNameInputRef.current &&
        !fNameInputRef.current.contains(event.target) &&
        lNameInputRef.current &&
        !lNameInputRef.current.contains(event.target) &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target) &&
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target) &&
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target) &&
        districtDropdownRef.current &&
        !districtDropdownRef.current.contains(event.target) &&
        talukDropdownRef.current &&
        !talukDropdownRef.current.contains(event.target) &&
        branchOfficeDropdownRef.current &&
        !branchOfficeDropdownRef.current.contains(event.target) &&
        phoneInputRef.current &&
        !phoneInputRef.current.contains(event.target) &&
        mailInputRef.current &&
        !mailInputRef.current.contains(event.target) &&
        addressInputRef.current &&
        !addressInputRef.current.contains(event.target) &&
        landmarkInputRef.current &&
        !landmarkInputRef.current.contains(event.target)
      ) {
        setIsTypingFname(false);
        setIsTypingLname(false);
        setIsSearchingCountry(false);
        setIsSearchingState(false);
        setIsSearchingCity(false);
        setIsSearchingDistrict(false);
        setIsSearchingTaluk(false);
        setIsSearchingOffice(false);
        setIsEnteringPhone(false);
        setIsEnteringMail(false);
        setIsEnteringAddress(false);
        setIsEnteringLandmark(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingCountries(true);
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
          fetch(indianJsonData),
        ]);

        // Check if any response is not ok
        for (const response of [
          countriesResponse,
          statesResponse,
          citiesResponse,
          indianDataResponse,
        ]) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

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

        // setIndianData(indianData);

        setOptimizedIndianData(optimizedData);

        // console.log("Optimized data:", optimizedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData().finally(() => setIsLoadingCountries(false));
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
      if (isIndianPlaces) {
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
    console.log("Cities:", cities);

    if (!selectedState) {
      return [];
    }
    if (!cities || cities.length === 0) {
      return [];
    }
    return cities.filter((city) =>
      city.city_name.toLowerCase().startsWith(citySearch.toLowerCase())
    );
  }, [cities, citySearch, selectedState]);

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
    /* Searching in Branch Offices */
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
  const validateAllFields = useCallback(() => {
    const newErrors = {};
    const firstNameErrors = [];
    const lastNameErrors = [];

    // Validate firstName
    if (!firstName || !firstName.trim()) {
      firstNameErrors.push("First name is required");
    } else {
      if (firstName.trim().length < 3) {
        firstNameErrors.push("First Name should be at least 3 characters long");
      }
      if (!/^[A-Za-z]+$/.test(firstName.trim())) {
        firstNameErrors.push("First name should contain only alphabets");
      }
      if (firstName.trim().length > 10) {
        firstNameErrors.push("First name should not exceed 10 characters");
      }
      const sanitizedFName = DOMPurify.sanitize(firstName.trim());
      if (sanitizedFName !== firstName.trim()) {
        firstNameErrors.push("First Name contains invalid characters");
      }
    }
    if (firstNameErrors.length > 0) {
      newErrors.firstName = firstNameErrors;
    }

    // Validate lastName
    if (!lastName || !lastName.trim()) {
      lastNameErrors.push("Last name is required");
    } else {
      if (lastName.trim().length < 2) {
        lastNameErrors.push("Last name should be at least 2 characters long");
      }
      if (!/^[A-Za-z]+$/.test(lastName.trim())) {
        lastNameErrors.push("Last name should contain only alphabets");
      }
      if (lastName.trim().length > 10) {
        lastNameErrors.push("Last name should not exceed 10 characters");
      }
      const sanitizedLName = DOMPurify.sanitize(lastName.trim());
      if (sanitizedLName !== lastName.trim()) {
        lastNameErrors.push("Last name contains invalid characters");
      }
    }
    if (lastNameErrors.length > 0) {
      newErrors.lastName = lastNameErrors;
    }

    // Validate email
    if (!email || !email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate phoneNumber
    if (!phoneNumber || !phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    // Validate country
    if (!selectedCountry) {
      newErrors.country = "Country is required";
    }

    // Validate state
    if (!selectedState) {
      newErrors.state = "State is required";
    }

    // Validate Indian-specific fields
    if (isIndianPlaces) {
      if (!selectedDistrict || !selectedDistrict.trim()) {
        newErrors.district = "District is required";
      }
      if (!selectedTaluk || !selectedTaluk.trim()) {
        newErrors.taluk = "Taluk is required";
      }
      if (!selectedBranchOffice || !selectedBranchOffice.trim()) {
        newErrors.branchOffice = "Branch office is required";
      }
      if (!selectedPincode || !selectedPincode.trim()) {
        newErrors.pincode = "Pincode is required";
      }
    } else {
      // Validate city for non-Indian places
      if (!selectedCity || !selectedCity.trim()) {
        newErrors.city = "City is required";
      }
    }

    // Validate addressLine
    if (!addressLine || !addressLine.trim()) {
      newErrors.addressLine = "Address is required";
    } else {
      const sanitizedAddress = DOMPurify.sanitize(addressLine.trim());
      if (sanitizedAddress !== addressLine.trim()) {
        newErrors.addressLine = "Address contains invalid characters";
      }
    }

    // Validate landmark
    if (!landmark || !landmark.trim()) {
      newErrors.landmark = "Landmark is required";
    } else {
      const sanitizedLandmark = DOMPurify.sanitize(landmark.trim());
      if (sanitizedLandmark !== landmark.trim()) {
        newErrors.landmark = "Landmark contains invalid characters";
      }
    }

    setErrors(newErrors);
    return newErrors;
  }, [
    firstName,
    lastName,
    email,
    phoneNumber,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedDistrict,
    selectedTaluk,
    selectedBranchOffice,
    selectedPincode,
    addressLine,
    landmark,
    isIndianPlaces,
  ]);
  const validateForm = useCallback(
    (field, value) => {
      const newErrors = { ...errors };
      // Validate firstName
      if (field === "firstName") {
        newErrors.firstName = [];
        if (!value || value.trim().length === 0) {
          newErrors.firstName.push("First Name is required");
        } else {
          const sanitizedAddress = DOMPurify.sanitize(value.trim());
          if (sanitizedAddress !== value.trim()) {
            newErrors.firstName.push("First Name contains invalid characters");
          } else {
            if (!/^[a-zA-Z]+$/.test(sanitizedAddress)) {
              newErrors.firstName.push(
                "First Name should contain only alphabets"
              );
            } else if (sanitizedAddress.length < 2) {
              newErrors.firstName.push(
                "First Name should be at least 2 characters long"
              );
            } else if (sanitizedAddress.length > 10) {
              newErrors.firstName.push(
                "First Name should not exceed 10 characters"
              );
            }
          }
        }

        if (newErrors.firstName.length === 0) {
          delete newErrors.firstName;
        }
      }

      // Validate lastName
      if (field === "lastName") {
        newErrors.lastName = [];
        if (!value || value.trim().length === 0) {
          newErrors.lastName.push("Last name is required");
        } else {
          const sanitizedAddress = DOMPurify.sanitize(value.trim());
          if (sanitizedAddress !== value.trim()) {
            newErrors.lastName.push("Last name contains invalid characters");
          } else {
            if (!/^[a-zA-Z]+$/.test(sanitizedAddress)) {
              newErrors.lastName.push(
                "Last name should contain only alphabets"
              );
            } else if (sanitizedAddress.length < 2) {
              newErrors.lastName.push(
                "Last name should be at least 2 characters long"
              );
            } else if (sanitizedAddress.length > 10) {
              newErrors.lastName.push(
                "Last name should not exceed 10 characters"
              );
            }
          }
        }

        if (newErrors.lastName.length === 0) {
          delete newErrors.lastName;
        }
      }

      // Validate email
      if (field === "email") {
        newErrors.email = [];
        if (!value || !value.trim()) {
          newErrors.email.push("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email.push("Email is invalid");
        } else {
          if (newErrors.email.length === 0) {
            delete newErrors.email;
          }
        }
      }

      // Validate phoneNumber
      if (field === "phoneNumber") {
        newErrors.phoneNumber = [];
        if (!value || !value.trim()) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) {
          newErrors.phoneNumber = "Phone number must be 10 digits";
        } else {
          if (newErrors.phoneNumber.length === 0) {
            delete newErrors.phoneNumber;
          }
        }
      }

      // Validate country
      if (field === "country") {
        if (!value) {
          newErrors.country = "Country is required";
        } else {
          delete newErrors.country;
        }
      }

      // Validate state
      if (field === "state") {
        if (!value) {
          newErrors.state = "State is required";
        } else {
          delete newErrors.state;
        }
      }

      // Validate Indian-specific fields
      if (isIndianPlaces) {
        if (field === "district") {
          if (!value || !value.trim()) {
            newErrors.district = "District is required";
          } else {
            delete newErrors.district;
          }
        }
        if (field === "taluk") {
          if (!value || !value.trim()) {
            newErrors.taluk = "Taluk is required";
          } else {
            delete newErrors.taluk;
          }
        }
        if (field === "branchOffice") {
          if (!value || !value.trim()) {
            newErrors.branchOffice = "Branch office is required";
          } else {
            delete newErrors.branchOffice;
          }
        }
        if (field === "pincode") {
          if (!value || !value.trim()) {
            newErrors.pincode = "Pincode is required";
          } else {
            delete newErrors.pincode;
          }
        }
      } else {
        // Validate city for non-Indian places
        if (field === "city") {
          if (!value || !value.trim()) {
            newErrors.city = "City is required";
          } else {
            delete newErrors.city;
          }
        }
      }

      // Validate addressLine
      if (field === "addressLine") {
        newErrors.addressLine = [];
        if (!value || value.trim().length === 0) {
          newErrors.addressLine.push("Address is required");
        } else {
          const sanitizedAddress = DOMPurify.sanitize(value.trim());
          if (sanitizedAddress !== value.trim()) {
            newErrors.addressLine.push("Address contain Invaild characters");
          } else {
            if (sanitizedAddress.length < 2) {
              newErrors.addressLine.push(
                "Address should be at least 2 characters long"
              );
            }
            if (sanitizedAddress.length > 10) {
              newErrors.addressLine.push(
                "Address should not exceed 10 characters"
              );
            }
          }
        }

        if (newErrors.addressLine.length === 0) {
          delete newErrors.addressLine;
        }
      }

      // Validate landmark
      if (field === "landmark") {
        newErrors.landmark = [];
        if (!value || !value.trim()) {
          newErrors.landmark = "Landmark is required";
        } else {
          const sanitizedLandmark = DOMPurify.sanitize(value.trim());
          if (sanitizedLandmark !== value.trim()) {
            newErrors.landmark = "Landmark contains invalid characters";
          } else {
            if (newErrors.landmark.length === 0) {
              delete newErrors.landmark;
            }
          }
        }
      }

      // console.log("Validation errors:", newErrors);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0 ? null : newErrors;
    },
    [isIndianPlaces, errors]
  );

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setAddressLine("");
    setLandmark("");
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedBranchOffice(null);
    setSelectedPincode(null);
    setCountrySearch("");
    setStateSearch("");
    setCitySearch("");
    setDistrictSearch("");
    setTalukSearch("");
    setBranchOfficeSearch("");
    setPincodeSearch("");
    setErrors({});
  }, []);
  const handleFirstNameChange = useCallback(
    (e) => {
      setIsTypingFname(true);
      const value = e.target.value;
      setFirstName(value);
      const newErrors = validateForm("firstName", value);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleLastNameChange = useCallback(
    (e) => {
      setIsTypingLname(true);
      const value = e.target.value;
      setLastName(value);
      const newErrors = validateForm("lastName", value);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleMailChange = useCallback(
    (e) => {
      setIsEnteringMail(true);
      const value = e.target.value;
      setEmail(value);
      const newErrors = validateForm("email", value);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handlePhoneNumberChange = useCallback(
    (e) => {
      setIsEnteringPhone(true);
      const value = e.target.value;
      setPhoneNumber(value);
      const newErrors = validateForm("phoneNumber", value);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleAddressLineChange = useCallback(
    (e) => {
      setIsEnteringAddress(true);
      const value = e.target.value;
      setAddressLine(value);
      const newErrors = validateForm("addressLine", value);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleLandmarkChange = useCallback(
    (e) => {
      setIsEnteringLandmark(true);
      const value = e.target.value;
      setLandmark(value);
      const newErrors = validateForm("landmark", value);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleCountrySelect = useCallback(
    (country) => {
      setSelectedCountry(country);
      setCountrySearch(country.name);
      setSelectedState(null);
      setStateSearch("");
      setCitySearch("");
      setCities([]);
      setIsSearchingCountry(false);
      setIsIndianPlaces(country.name === "India");
      validateForm("country", country.name);
      if (country.name !== "India") {
        setDistrictSearch("");
        setTalukSearch("");
        setBranchOfficeSearch("");
        setPincodeSearch("");
        const newErrors = validateForm("country", country.name);
        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      }
    },
    [validateForm]
  );

  const handleStateSelect = useCallback(
    (state) => {
      setSelectedState(state);
      setStateSearch(state.state_name);
      setCitySearch("");
      setIsSearchingState(false);
      const newErrors = validateForm("state", state.state_name);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      if (isIndianPlaces) {
        setCitySearch("");
        setDistrictSearch("");
        setTalukSearch("");
        setBranchOfficeSearch("");
        setPincodeSearch("");
        const newErrors = validateForm("state", state.state_name);
        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      } else {
        // Reset Indian-specific fields
        setDistrictSearch("");
        setTalukSearch("");
        setBranchOfficeSearch("");
        setPincodeSearch("");
      }
    },
    [isIndianPlaces, validateForm]
  );

  const handleCitySelect = useCallback(
    (city) => {
      console.log("City selected:", city);

      setSelectedCity(city.city_name);
      setCitySearch(city.city_name);
      setIsSearchingCity(false);
      const newErrors = validateForm("city", city.city_name);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleDistrictSelect = useCallback(
    (district) => {
      setDistrictSearch(district);
      setSelectedDistrict(district);
      setIsSearchingDistrict(false);
      setTalukSearch("");
      setBranchOfficeSearch("");
      setPincodeSearch("");
      const newErrors = validateForm("district", district);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleTalukSelect = useCallback(
    (taluk) => {
      setSelectedTaluk(taluk);
      setIsSearchingTaluk(false);
      setTalukSearch(taluk);
      setBranchOfficeSearch("");
      setPincodeSearch("");
      const newErrors = validateForm("taluk", taluk);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleBranchOfficeSelect = useCallback(
    (office) => {
      setSelectedBranchOffice(office.officeName);
      setBranchOfficeSearch(office.officeName);
      setPincodeSearch(office.pincode.toString());
      setSelectedPincode(office.pincode.toString());
      setIsSearchingOffice(false);
      const newErrors = validateForm("branchOffice", office.officeName);
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    [validateForm]
  );

  const handleSubmit = useCallback(
    async (e) => {
      if (e) {
        e.preventDefault();
      }
      if (isSubmitting) {
        setShowResubmitModal(true);
        return;
      }

      setErrors({});
      setIsSubmitting(true);

      const formErrors = validateAllFields();
      console.log("form errors:", formErrors);

      if (Object.keys(formErrors).length === 0) {
        try {
          const formData = {
            timeOfSubmission: new Date().toISOString(),
            isIndia: selectedCountry?.name.toLowerCase() === "india",
            personalInfo: { firstName, lastName, email, phoneNumber },
            address: {
              addressLine,
              landmark,
              country: selectedCountry?.name,
              state: selectedState?.state_name,
              ...(isIndianPlaces
                ? {
                    district: selectedDistrict,
                    taluk: selectedTaluk,
                    branchOffice: selectedBranchOffice,
                    pincode: selectedPincode,
                  }
                : {
                    city: selectedCity,
                  }),
            },
          };

          console.log("Form data:", formData);

          const response = await fetch("http://localhost:3000/formData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (
              response.status === 409 &&
              errorData.details &&
              errorData.details.includes("duplicate key error")
            ) {
              throw new Error(
                "Email address already exists. Please use a different email."
              );
            } else {
              throw new Error(
                errorData.error || `HTTP error! status: ${response.status}`
              );
            }
          }

          const data = await response.json();
          console.log("API response:", data);
          setSubmissionStatus({
            type: "success",
            message: "Form submitted successfully!",
          });
          resetForm();
        } catch (error) {
          console.error("Submission error:", error);
          setSubmissionStatus({
            type: "error",
            message:
              error.message || "Form submission failed. Please try again.",
          });
        }
      } else {
        setErrors(formErrors);
        setSubmissionStatus({
          type: "error",
          message: "Please correct the errors in the form.",
        });
      }

      setIsSubmitting(false);
    },
    [
      isSubmitting,
      resetForm,
      firstName,
      lastName,
      email,
      phoneNumber,
      addressLine,
      landmark,
      selectedCountry,
      selectedState,
      selectedCity,
      selectedDistrict,
      selectedTaluk,
      selectedBranchOffice,
      selectedPincode,
      isIndianPlaces,
      validateAllFields,
    ]
  );

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 justify-center items-center">
      <div className="flex h-auto w-full lg:w-2/4 bg-slate-500 drop-shadow-md rounded-[25px] p-8 transition-all ease-in-out duration-200">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="flex flex-col gap-y-6">
            <div className="flex gap-5">
              {/* First Name */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="first-name"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  First Name
                </label>
                <input
                  ref={fNameInputRef}
                  id="first-name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    handleFirstNameChange(e);
                  }}
                  onFocus={() => setIsTypingFname(true)}
                  onBlur={() => setIsTypingFname(false)}
                  type="text"
                  placeholder="Rajkiran"
                  className={`relative w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-500 " : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {typingFname &&
                  errors.firstName &&
                  Array.isArray(errors.firstName) && (
                    <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                        {errors.firstName.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              {/* Last Name */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="last-name"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  Last Name
                </label>
                <input
                  ref={lNameInputRef}
                  id="last-name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => handleLastNameChange(e)}
                  onFocus={() => setIsTypingLname(true)}
                  onBlur={() => setIsTypingLname(false)}
                  type="text"
                  placeholder="Dev"
                  className={`relative w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {typingLname &&
                  errors.lastName &&
                  Array.isArray(errors.lastName) && (
                    <div className="absolute z-10 w-2/3 lg:-right-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                        {errors.lastName.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="flex gap-5">
              {/* Email */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  Email
                </label>
                <input
                  ref={mailInputRef}
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleMailChange(e)}
                  onFocus={() => setIsEnteringMail(true)}
                  onBlur={() => setIsEnteringMail(false)}
                  type="email"
                  placeholder="rajkiran.dev@example.com"
                  className={`relative w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {isEnteringMail &&
                  errors.email &&
                  Array.isArray(errors.email) && (
                    <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                        {errors.email.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              {/* Phone Number */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="phone-number"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  Phone No
                </label>
                <input
                  ref={phoneInputRef}
                  id="phone-number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e)}
                  onFocus={() => setIsEnteringPhone(true)}
                  onBlur={() => setIsEnteringPhone(false)}
                  type="tel"
                  placeholder="123-456-7890"
                  className={`relative w-full px-3 py-2 border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.phoneNumber
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />

                {isEnteringPhone && errors.phoneNumber && (
                  <div
                    className="absolute z-10 w-2/3 lg:-right-[68%] font-light 
                    right-0 backdrop:blur-md -top-0 lg:top-10 bg-red-100 border  
                    rounded-md shadow-lg p-2 mt-1 transition-all ease-in-out duration-200"
                  >
                    <div className="text-red-500 text-[7pt] sm:text-xs h-auto">
                      {errors.phoneNumber}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              {/* Country Input */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="country-search"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  Country
                </label>
                <input
                  ref={countryDropdownRef}
                  id="country-search"
                  name="countrySearch"
                  value={countrySearch}
                  onFocus={() => setIsSearchingCountry(true)}
                  onBlur={() => {
                    if (selectedCountry) {
                      setIsSearchingCountry(false);
                    }
                  }}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setIsSearchingCountry(true);
                    if (!e.target.value) {
                      setSelectedCity("");
                      setSelectedState("");
                      setSelectedDistrict("");
                      setStates([]);
                      setCities([]);
                    
                    }
                  }}
                  type="text"
                  placeholder="choose country"
                  className={`relative w-full px-3 py-2 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.country
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {isSearchingCountry &&
                  errors.country &&
                  Array.isArray(errors.country) && (
                    <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                        {errors.country.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}
                {isSearchingCountry && (
                  <Suspense fallback={<Loading />}>
                    {isLoadingCountries ? (
                      <Loading />
                    ) : (
                      <ul className="absolute z-10 w-full top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredCountries.map((country) => (
                          <li
                            key={country.id}
                            onClick={() => {
                              handleCountrySelect(country);
                              setIsSearchingCountry(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {country.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Suspense>
                )}
              </div>

              {/* State Input */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="state-search"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  State
                </label>
                <input
                  ref={stateDropdownRef}
                  id="state-search"
                  type="text"
                  name="states"
                  value={stateSearch}
                  onFocus={() => setIsSearchingState(true)}
                  onBlur={() => {
                    if (selectedState) {
                      setIsSearchingState(false);
                    }
                  }}
                  onChange={(e) => {
                    setStateSearch(e.target.value);
                    setIsSearchingState(true);
                    if (!e.target.value) {
                      setSelectedState("");
                      setCities([]);
                      setSelectedCity("");
                      setDistrictSearch("");
                      setTalukSearch("");
                      setBranchOfficeSearch("");
                      setPincodeSearch("");
                    }
                  }}
                  placeholder="Choose state"
                  disabled={!selectedCountry}
                  className={`relative w-full px-3 py-2 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.state ? "focus:ring-red-500" : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {isSearchingState &&
                  errors.state &&
                  Array.isArray(errors.state) && (
                    <div className="absolute z-10 w-2/3 lg:-right-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                        {errors.state.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedCountry && isSearchingState && (
                  <ul className="absolute z-10 w-full top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredStates.map((state) => (
                      <li
                        key={state.state_id}
                        onClick={() => {
                          handleStateSelect(state);
                          setIsSearchingState(false);
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {state.state_name.charAt(0).toLowerCase() +
                          state.state_name.slice(1).toLowerCase()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {isIndianPlaces ? (
              <>
                <div className="flex gap-5">
                  {/* District Input */}
                  <div className="flex-1 flex flex-col relative">
                    <label
                      htmlFor="district-search"
                      className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                    >
                      District
                    </label>
                    <input
                      ref={districtDropdownRef}
                      id="district-search"
                      type="text"
                      name="district"
                      value={districtSearch}
                      onFocus={() => setIsSearchingDistrict(true)}
                      onBlur={() => {
                        if (selectedDistrict) {
                          setIsSearchingDistrict(false);
                        }
                      }}
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
                      placeholder="Choose district"
                      disabled={!selectedState}
                      className={`relative w-full px-3 py-2 border ${
                        errors.district ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 ${
                        errors.district
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-500"
                      } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    />
                    {isSearchingDistrict &&
                      errors.district &&
                      Array.isArray(errors.district) && (
                        <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                          <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                            {errors.district.map((error, index) => (
                              <p key={index}>{error}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    {selectedState && isSearchingDistrict && (
                      <ul className="absolute z-10 w-full top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredDistricts.map((district) => (
                          <li
                            key={district}
                            onClick={() => {
                              handleDistrictSelect(district);
                              setIsSearchingDistrict(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {district}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Taluk Input */}
                  <div className="flex-1 flex flex-col relative">
                    <label
                      htmlFor="taluk-search"
                      className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                    >
                      Taluk
                    </label>
                    <input
                      ref={talukDropdownRef}
                      id="taluk-search"
                      type="text"
                      name="taluk"
                      value={talukSearch}
                      onFocus={() => setIsSearchingTaluk(true)}
                      onBlur={() => {
                        if (selectedTaluk) {
                          setIsSearchingTaluk(false);
                        }
                      }}
                      onChange={(e) => {
                        setTalukSearch(e.target.value);
                        setIsSearchingTaluk(true);
                        if (!e.target.value) {
                          setTalukSearch("");
                          setBranchOfficeSearch("");
                          setPincodeSearch("");
                        }
                      }}
                      placeholder="Choose taluk"
                      disabled={!districtSearch}
                      className={`relative w-full px-3 py-2 border ${
                        errors.taluk ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 ${
                        errors.taluk
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-500"
                      } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    />
                    {isSearchingTaluk && errors.taluk && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.taluk}
                      </p>
                    )}
                    {districtSearch && isSearchingTaluk && (
                      <ul className="absolute z-10 w-full top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredTaluks.map((taluk) => (
                          <li
                            key={taluk}
                            onClick={() => {
                              handleTalukSelect(taluk);
                              setIsSearchingTaluk(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {taluk}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="flex gap-5">
                  {/* Branch Office Input */}
                  <div className="flex-1 flex flex-col relative">
                    <label
                      htmlFor="branch-office-search"
                      className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                    >
                      Branch Office
                    </label>
                    <div className="flex-1 relative">
                      <input
                        ref={branchOfficeDropdownRef}
                        id="branch-office-search"
                        type="text"
                        name="branchOffice"
                        value={branchOfficeSearch}
                        onFocus={() => setIsSearchingOffice(true)}
                        onBlur={() => {
                          if (selectedBranchOffice) {
                            setIsSearchingOffice(false);
                          }
                        }}
                        onChange={(e) => {
                          setBranchOfficeSearch(e.target.value);
                          setIsSearchingOffice(true);
                          if (!e.target.value) {
                            setBranchOfficeSearch("");
                            setPincodeSearch("");
                          }
                        }}
                        placeholder="Choose branch office"
                        disabled={!talukSearch}
                        className={`relative w-full px-3 py-2 border ${
                          errors.branchOffice
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 ${
                          errors.branchOffice
                            ? "focus:ring-red-500"
                            : "focus:ring-blue-500"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {isSearchingOffice &&
                        errors.branchOffice &&
                        Array.isArray(errors.branchOffice) && (
                          <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                            <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                              {errors.branchOffice.map((error, index) => (
                                <p key={index}>{error}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      {talukSearch && isSearchingOffice && (
                        <ul className="absolute z-10 w-full top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {filteredBranchOffices.map((office) => (
                            <li
                              key={office.id}
                              onClick={() => {
                                handleBranchOfficeSelect(office);
                                setIsSearchingOffice(false);
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {office.officeName} - {office.pincode}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Pincode Input */}
                  <div className="flex-1 flex flex-col relative">
                    <label
                      htmlFor="pincode"
                      className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                    >
                      Pincode
                    </label>
                    <div className="flex-1">
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
                        className={`relative w-full px-3 py-2 border ${
                          errors.pincode ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 ${
                          errors.pincode
                            ? "focus:ring-red-500"
                            : "focus:ring-blue-500"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // City Input for non-Indian places
              <div className="relative">
                <label
                  htmlFor="city-search"
                  className="block text-sm font-medium text-stone-50 mb-1"
                >
                  City
                </label>
                <input
                  ref={cityDropdownRef}
                  id="city-search"
                  type="text"
                  name="city"
                  value={citySearch}
                  onFocus={() => setIsSearchingCity(true)}
                  onBlur={() => {
                    if (selectedCity) {
                      setIsSearchingCity(false);
                    }
                  }}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setIsSearchingCity(true);
                  }}
                  placeholder="Choose city"
                  disabled={!selectedState}
                  className={`relative w-full px-3 py-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.city ? "focus:ring-red-500" : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {isSearchingCity &&
                  errors.city &&
                  Array.isArray(errors.city) && (
                    <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-[7pt] sm:text-xs overflow-y-scroll max-sm:h-[66px]">
                        {errors.city.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}
                {selectedState && isSearchingCity && !isLoadingCities && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <li
                          key={city.city_id}
                          onClick={() => {
                            handleCitySelect(city);
                          }}
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
            {/* Flat/Floor/H.No */}
            <div className="flex gap-5">
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="flat-floor-hno"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  Address
                </label>
                <input
                  ref={addressInputRef}
                  id="flat-floor-hno"
                  type="text"
                  name="flatFloorHno"
                  value={addressLine}
                  onChange={(e) => handleAddressLineChange(e)}
                  onFocus={() => setIsEnteringAddress(true)}
                  onBlur={() => setIsEnteringAddress(false)}
                  placeholder="Flat/Floor/H.No"
                  className={`relative w-full px-3 py-2 border ${
                    errors.addressLine ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.addressLine
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {isEnteringAddress &&
                  errors.addressLine &&
                  Array.isArray(errors.addressLine) && (
                    <div className="absolute z-10 w-2/3 lg:-left-[68%] font-light right-0 backdrop:blur-md top-full lg:top-10 bg-red-100 border rounded-md shadow-lg p-2 mt-1">
                      <div className="text-red-500 text-xs sm:text-sm overflow-y-auto max-h-24">
                        {console.log(
                          "Array of Address Errors: ",
                          errors.addressLine
                        )}
                        {errors.addressLine.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              {/* Landmark */}
              <div className="flex-1 flex flex-col relative">
                <label
                  htmlFor="landmark"
                  className="text-base font-medium text-stone-50 mb-1 h-10 flex items-start"
                >
                  Landmark
                </label>
                <input
                  ref={landmarkInputRef}
                  id="landmark"
                  type="text"
                  name="landmark"
                  value={landmark}
                  onChange={(e) => handleLandmarkChange(e)}
                  onFocus={() => setIsEnteringLandmark(true)}
                  onBlur={() => setIsEnteringLandmark(false)}
                  placeholder="Landmark"
                  className={`relative w-full px-3 py-2 border ${
                    errors.landmark ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.landmark
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {isEnteringLandmark && errors.landmark && (
                  <div
                    className="absolute z-10 w-2/3 lg:-right-[68%] font-light 
                        right-0 backdrop:blur-md -top-[70%] lg:top-10 bg-red-100 border  
                        rounded-md shadow-lg p-2 mt-1"
                  >
                    <div className="text-red-500 text-[7pt] sm:text-xs h-auto max-sm:h-[66px]">
                      {errors.landmark}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <button
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                className="w-1/3 bg-red-200 text-black-500 py-2 px-2 text-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                type="button"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>

            {submissionStatus && (
              <div
                className={`mt-4 p-2 rounded-md ${
                  submissionStatus.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submissionStatus.message}
              </div>
            )}
          </div>
        </form>
        {showResubmitModal && (
          <ResubmitModal
            setShowResubmitModal={setShowResubmitModal}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      {/* Form Data Table */}
      {Object.keys(formData).length > 0 && (
        <div className="w-auto md:w-1.5/4 transition-all ease-in-out duration-150">
          <h2 className="text-xl text-center bg-lime-200 font-bold text-stone-50 mb-4 md:p-4 ">
            Form Data
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {formData.timeOfSubmission && (
                  <tr>
                    <td className="px-6 py-4 text-left text-sm text-gray-900">
                      Time of Submission
                    </td>
                    <td className="px-6 py-4 text-left text-sm text-gray-900">
                      {new Date(formData.timeOfSubmission).toLocaleString()}
                    </td>
                  </tr>
                )}
                {Object.entries(formData).map(
                  ([sectionTitle, sectionData], sectionIndex) => {
                    if (sectionTitle === "timeOfSubmission") return null;
                    if (typeof sectionData !== "object" || sectionData === null)
                      return null;

                    return (
                      <React.Fragment key={sectionIndex}>
                        <tr>
                          <td
                            colSpan="2"
                            className="px-6 py-4 text-left text-sm font-bold text-gray-900 bg-violet-100"
                          >
                            {sectionTitle}
                          </td>
                        </tr>
                        {Object.entries(sectionData).map(
                          ([fieldName, fieldValue], index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 text-left text-stone-800 bg-yellow-100">
                                {fieldName.charAt(0).toUpperCase() +
                                  fieldName.slice(1).toLowerCase()}
                              </td>
                              <td className="px-6 py-4 text-left text-sm text-gray-600 border">
                                {fieldValue !== null && fieldValue !== undefined
                                  ? String(fieldValue)
                                  : "N/A"}
                              </td>
                            </tr>
                          )
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* End of */}
    </div>
  );
}

export default FormCountryDropdown;
