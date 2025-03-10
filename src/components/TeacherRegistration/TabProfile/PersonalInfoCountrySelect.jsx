import { countriesSelection } from "@/src/data/dataTeacherRegistration";

// External imports
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

// React imports
import Image from "next/image";

// Icons
import { ChevronDownSmallIcon } from "../../Icons";

const PersonalInfoCountrySelect = ({ country }) => {
  const selectedCountry = countriesSelection.find(
    (countryItem) => countryItem.key === country.value
  );

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    country.onChange(selectedKey);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="country-ipractis-dropdown shadow-none rounded-[10px]">
          {selectedCountry && (
            <Image
              className="w-[40px] h-[24px] rounded-[5px] object-cover"
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
        selectedKeys={new Set([country.value])}
        onSelectionChange={handleSelectionChange}
        aria-label="Single Country Selection"
        disallowEmptySelection
        selectionMode="single"
        variant="flat"
      >
        {countriesSelection?.map((countryItem) => (
          <DropdownItem
            className="flex items-center"
            textValue={countryItem?.alt}
            key={countryItem?.key}
          >
            <Image
              className="w-[26px] h-[24px] rounded-[5px] object-cover inline"
              src={countryItem?.image}
              alt={countryItem?.alt}
            />

            <span className="ml-2 inline">{countryItem?.key}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default PersonalInfoCountrySelect;
