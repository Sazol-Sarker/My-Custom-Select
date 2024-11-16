import React, { useState, useEffect } from "react";
import "./Select.css";

const Select = ({
  label = "",
  value = [],
  onChange = () => {},
  options = [],
  multiple = false,
  placeholder = "Select...",
  searchEnabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedValues, setSelectedValues] = useState(value);
  const [isMultiple, setIsMultiple] = useState(multiple); // Track multiple select mode

  useEffect(() => {
    // Filter out already selected options from the dropdown
    setFilteredOptions(
      options.filter(
        (option) =>
          !selectedValues.includes(option) &&
          option.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, selectedValues, options]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (isMultiple) {
      const updatedValues = [...selectedValues, option];
      setSelectedValues(updatedValues);
      onChange(updatedValues);
    } else {
      setSelectedValues([option]);
      onChange(option);
      setIsOpen(false);
    }
  };

  const removeSelectedOption = (option) => {
    const updatedValues = selectedValues.filter((item) => item !== option);
    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle between multiple and single selection modes
  const toggleSelectMode = () => {
    setIsMultiple(!isMultiple); // Toggle the mode
  };

  // Check if there are no filtered options left or if all options are selected
  const noMoreOptions =
    filteredOptions.length === 0 &&
    (selectedValues.length === options.length || !filteredOptions.length);

  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <div className="select-header" onClick={toggleDropdown}>
        <div className="select-placeholder">
          {selectedValues.length > 0 ? (
            <div className="selected-options">
              {selectedValues.map((option) => (
                <div className="selected-option" key={option}>
                  {option}
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedOption(option);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span className="placeholder-text">{placeholder}</span>
          )}
        </div>
        <div className="select-arrow">{isOpen ? "▲" : "▼"}</div>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {searchEnabled && (
            <div className="select-search-container">
              <input
                type="text"
                className="select-search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
              />
              {/* Toggle button */}
              <div className="toggle-container">
                <span>{isMultiple ? "Multi Select" : "Single Select"}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isMultiple}
                    onChange={toggleSelectMode}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}
          <ul className="select-options">
            {noMoreOptions ? (
              <li className="select-option no-options">No more options</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className="select-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
