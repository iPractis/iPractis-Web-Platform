import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getWordsCapitalized } from "@/src/lib/utils/getWordsCapitalized";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { fetchCountries } from "@/src/lib/utils/fetchCountries";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { useEffect, useState, useRef } from "react";
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
  const mirrorRef = useRef(null);
  const prefixRef = useRef(null);

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
      const filteredSuggestions = countries
        .filter((country) =>
          country.name.toLowerCase().startsWith(capitalizedValue.toLowerCase())
        )
        .map((c) => c.name);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (
      (e.key === "Tab" || e.key === "ArrowRight" || e.key === "Enter") &&
      suggestions.length > 0
    ) {
      e.preventDefault();
      const completedCountry = suggestions[0];
      field.onChange(completedCountry);
      setSuggestions([]);

      if (nextInputName) {
        const nextInput = document.querySelector(
          `input[name="${nextInputName}"]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleBlur = () => {
    const value = field?.value?.trim();
    if (!value) {
      setSuggestions([]);
      return;
    }

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
        <div className="relative w-full">
          {/* Input with startContent */}
          <CustomNextUiInput
            type="text"
            placeholder={placeholder}
            label={label}
            classNames={{
              inputWrapper: fieldError?.message && "form-input-error",
              input: "relative z-10 bg-transparent",
            }}
            value={field?.value || ""}
            onBlur={handleBlur}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            name={name}
            labelPlacement="outside"
            startContent={
              <span ref={prefixRef} className="flex items-center gap-1.5">
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

          {/* Invisible mirror span for typed text */}
          <span
            ref={mirrorRef}
            className="absolute top-0 left-0 invisible whitespace-pre px-3 py-2 font-inherit text-base"
          >
            {field?.value}
          </span>

          {/* Ghost suggestion */}
          {suggestions.length > 0 && field?.value && (
            <span
              className="absolute top-1/2 left-1/2 -translate-y-1/2 text-primary-color-P7 pointer-events-none"
              style={{
                left:
                  (prefixRef.current?.offsetWidth || 0) +
                  (mirrorRef.current?.offsetWidth || 0),
              }}
            >
              {suggestions[0].slice(field.value.length)}
            </span>
          )}
        </div>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={fieldError?.message} />
    </div>
  );
};

export default BaseCountryInput;
