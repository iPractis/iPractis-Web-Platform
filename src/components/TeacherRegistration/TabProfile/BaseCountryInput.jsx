import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getWordsCapitalized } from "@/src/lib/utils/getWordsCapitalized";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { fetchCountries } from "@/src/lib/utils/fetchCountries";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// React imports
import { useEffect, useState } from "react";

// Icons
import { FlagIcon } from "../../Icons";

const BaseCountryInput = ({
  SelectComponent,
  nextInputName,
  placeholder,
  fieldError,
  errors,
  field,
  label,
  name,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    getCountries();
  }, []);

  const handleInputChange = (value) => {
    const capitalizedValue = getWordsCapitalized(value);
    field.onChange(capitalizedValue);

    if (capitalizedValue) {
      const filteredSuggestions = countries.filter((country) =>
        country.name.toLowerCase().startsWith(capitalizedValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Handle autocomplete on Tab/Enter/ArrowRight
  const handleKeyDown = (e) => {
    if (
      (e.key === "Tab" || e.key === "ArrowRight" || e.key === "Enter") &&
      suggestions.length > 0
    ) {
      e.preventDefault();
      const completedCountry = suggestions[0].name;

      // set full country
      field.onChange(completedCountry);
      setSuggestions([]);

      // move to next field
      const nextInput = document.querySelector(
        `input[name="${nextInputName}"]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  // ✅ On blur: if invalid, clear input
  const handleBlur = () => {
    const value = field?.value?.trim();
    if (!value) return;

    const exists = countries.some(
      (country) => country.name.toLowerCase() === value.toLowerCase()
    );

    if (!exists) {
      field.onChange(""); // clear invalid
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(errors, field?.value, name)}
      >
        <CustomNextUiInput
          type="text"
          placeholder={placeholder}
          label={label}
          classNames={{
            inputWrapper: fieldError?.message && "form-input-error",
          }}
          value={field?.value}
          onBlur={handleBlur}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          name={name}
          labelPlacement="outside"
          startContent={
            <span className="flex items-center gap-1.5">
              <InputBGWrapperIcon>
                <FlagIcon />
              </InputBGWrapperIcon>

              <SelectComponent
                setCountries={setCountries}
                countries={countries}
                field={field}
              />
            </span>
          }
        />

        {/* Autocomplete ghost text */}
        {suggestions?.length > 0 && field?.value && (
          <span
            className={`absolute right-1/2 top-0 h-full flex items-center pointer-events-none text-primary-color-P7`}
          >
            {suggestions[0].name.slice(field?.value.length)}
          </span>
        )}
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={fieldError?.message} />
    </div>
  );
};

export default BaseCountryInput;
