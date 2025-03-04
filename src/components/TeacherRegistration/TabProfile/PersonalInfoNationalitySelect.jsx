import { countriesSelection } from "@/src/data/dataTeacherRegistration";

// External imports
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

// React import
import Image from "next/image";

// Icons
import { ChevronDownSmallIcon } from "../../Icons";

const PersonalInfoNationalitySelect = ({ nationality }) => {
  const selectedCountry = countriesSelection.find(
    (country) => country.key === nationality.value
  );

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    nationality.onChange(selectedKey);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="country-ipractis-dropdown shadow-none">
          {selectedCountry && (
            <Image
              className="w-[26px] h-[24px] rounded-[5px] object-cover"
              alt={selectedCountry.alt}
              src={selectedCountry.image}
            />
          )}
          
          <div className="mx-auto">
            <ChevronDownSmallIcon fillColor={"fill-primary-color-P4"} />
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        selectedKeys={new Set([nationality.value])}
        onSelectionChange={handleSelectionChange}
        aria-label="Single Country Selection"
        disallowEmptySelection
        selectionMode="single"
        variant="flat"
      >
        {countriesSelection?.map((country) => (
          <DropdownItem
            className="flex items-center"
            textValue={country?.alt}
            key={country?.key}
          >
            <Image
              className="w-[26px] h-[24px] rounded-[5px] object-cover inline"
              src={country?.image}
              alt={country?.alt}
            />
            <span className="ml-2 inline">{country?.key}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default PersonalInfoNationalitySelect;
