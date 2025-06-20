import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactCountryFlag from "react-country-flag";

const CountryDropdown = ({
  isOpen,
  countries,
  setSelectedCountry,
  setIsOpen,
  countriesDropdown,
}) => {
  const [userInput, setUserInput] = useState("");
  const [searchText, setSearchText] = useState("");

  // Listen for single-character country code shortcuts (if searchText is empty)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (searchText.length > 0) return; // ignore if user is typing in search
      if (e.key === "Backspace") {
        setUserInput("");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        setUserInput(e.key.toLowerCase());
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, searchText]);

  // Filter countries
  let filteredCountries = countries;

  if (searchText.trim()) {
    const search = searchText.toLowerCase();
    filteredCountries = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(search) ||
        country.code.toLowerCase().includes(search) ||
        country.dial_code.includes(search)
    );
  } else if (userInput) {
    filteredCountries = countries.filter((country) =>
      country.code.toLowerCase().startsWith(userInput)
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="flex flex-col gap-2 p-4 bg-[#F3F3F3] text-[#26292D] font-semibold rounded-xl absolute top-full mt-2 z-50 max-h-48 w-full codes-scroll-container overflow-y-scroll transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={countriesDropdown}
        >
          {/* 🔍 Search Input */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="SEARCH"
              className="w-full py-3 px-4 pr-10 rounded-md border-b border-gray-300 text-sm outline-none uppercase "
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setUserInput(""); // clear single-key filter when typing
              }}
            />
          </div>

          {/* 🌍 Country List */}
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.code}
                className="py-2 px-2 flex items-center gap-2 cursor-pointer font-medium text-sm text-site-text-white-color hover:bg-white duration-200 rounded"
                onClick={() => {
                  setSelectedCountry(country);
                  setIsOpen(false);
                  setUserInput("");
                  setSearchText("");
                }}
              >
                <ReactCountryFlag countryCode={country.code} svg />
                <p>
                  {country.name} ({country.dial_code})
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">
              No countries found.
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountryDropdown;
