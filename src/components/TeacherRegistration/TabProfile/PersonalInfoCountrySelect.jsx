// External imports
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

// React imports
import { useEffect, useState } from "react";
import Image from "next/image";

// Icons
import { ChevronDownSmallIcon } from "../../Icons";

const PersonalInfoCountrySelect = ({ countryField }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const url = "https://restcountries.com/v3.1/all";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        const countriesData = json.map((country) => ({
          name: country.name.common,
          flag: country.flags.png,
        }));

        setCountries(countriesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  const selectedCountry = countries?.find(
    (countryItem) => countryItem.name === countryField.value
  );

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    countryField.onChange(selectedKey);
  };

  return (
    <Dropdown classNames={{ content: "overflow-y-auto max-h-[15rem]" }}>
      <DropdownTrigger>
        <Button className="rounded-[10px] shadow-none country-ipractis-dropdown">
          {selectedCountry && (
            <Image
              className="h-[24px] rounded-[5px] w-[40px] object-cover"
              alt={selectedCountry.name}
              src={selectedCountry.flag}
              height={24}
              width={26}
            />
          )}

          <div className="mx-auto">
            <ChevronDownSmallIcon fillColor={"fill-primary-color-P4"} />
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        selectedKeys={new Set([countryField.value])}
        onSelectionChange={handleSelectionChange}
        aria-label="Single Country Selection"
        disallowEmptySelection
        selectionMode="single"
        variant="flat"
      >
        {countries?.map((countryItem) => (
          <DropdownItem
            className="flex items-center"
            textValue={countryItem?.name}
            key={countryItem?.name}
          >
            <Image
              className="h-[24px] rounded-[5px] w-[26px] inline object-cover"
              src={countryItem?.flag}
              alt={countryItem?.name}
              height={24}
              width={26}
            />

            <span className="inline ml-2">{countryItem?.name}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default PersonalInfoCountrySelect;
