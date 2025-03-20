import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { fetchCountries } from "@/src/lib/utils/fetchCountries";

// React imports
import { useEffect, useState } from "react";

// Icons
import { FlagIcon, QuestionMark } from "../../Icons";

const CountryResidenceInput = ({ errors, countryField, countryFieldError }) => {
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
    countryField.onChange(value);

    if (value) {
      const filteredSuggestions = countries.filter((country) =>
        country.name.toLowerCase().startsWith(value.toLowerCase())
      );

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
      const completedCountry = suggestions[0].name;
      countryField.onChange(completedCountry);

      const nextInput = document.querySelector('input[name="middleName"]');
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div>
      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          countryField?.value,
          "country"
        )}
      >
        <CustomNextUiInput
          type="text"
          placeholder="Select a country"
          label={
            <span className="flex gap-1.5 items-center">
              Country <QuestionMark fillColor={"fill-primary-color-P4"} />
            </span>
          }
          classNames={{
            inputWrapper: countryFieldError?.message && "form-input-error",
          }}
          value={countryField?.value}
          onBlur={countryField?.onBlur}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          name="country"
          labelPlacement="outside"
          startContent={
            <span className="flex items-center gap-1.5">
              <InputBGWrapperIcon>
                <FlagIcon />
              </InputBGWrapperIcon>

              <PersonalInfoCountrySelect
                setCountries={setCountries}
                countryField={countryField}
                countries={countries}
              />
            </span>
          }
        />

        {suggestions?.length > 0 && (
          <span
            className={`absolute right-1/2 top-0 h-full flex items-center pointer-events-none text-primary-color-P7`}
          >
            {suggestions[0].name.slice(countryField?.value.length)}
          </span>
        )}
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={countryFieldError?.message} />
    </div>
  );
};

export default CountryResidenceInput;
