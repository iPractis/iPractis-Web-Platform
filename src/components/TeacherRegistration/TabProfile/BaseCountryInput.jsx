import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
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
  errors,
  field,
  fieldError,
  name,
  label,
  placeholder,
  SelectComponent,
  nextInputName,
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
    field.onChange(value);

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
      field.onChange(completedCountry);

      const nextInput = document.querySelector(`input[name="${nextInputName}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div>
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
          onBlur={field?.onBlur}
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

        {suggestions?.length > 0 && (
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