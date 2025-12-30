import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { flagAndAreaCodeCountries } from "@/src/data/dataLogin";
import { ChevronDownSmallIcon } from "@/src/components/Icons/index";
import { useState } from "react";
import Image from "next/image";

// Icons && images
import ukFlag from "@/public/flags/united-kingdom.png";

const SelectCountryAreaCode = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    image: ukFlag,
    alt: "United Kingdom",
    areaCode: "+44",
  });

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    const country = flagAndAreaCodeCountries.find(
      (country) => country.areaCode === selectedKey
    );
    setSelectedCountry(country);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="country-ipractis-dropdown-areacode shadow-none">
          <Image
            className="w-[26px] h-[24px] rounded-[5px] object-cover"
            alt={selectedCountry.alt}
            src={selectedCountry.image}
          />

          <h2 className="ST-SB-3">{selectedCountry?.areaCode}</h2>

          <div className="mx-auto">
            <ChevronDownSmallIcon fillcolor={"fill-primary-color-P4"} />
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        selectedKeys={new Set([selectedCountry.areaCode])}
        onSelectionChange={handleSelectionChange}
        aria-label="Single Country Selection"
        disallowEmptySelection
        selectionMode="single"
        variant="flat"
      >
        {flagAndAreaCodeCountries?.map((country) => (
          <DropdownItem
            className="flex items-center"
            textValue={country?.areaCode}
            key={country?.areaCode}
          >
            <Image
              className="w-[26px] h-[24px] rounded-[5px] object-cover inline"
              src={country?.image}
              alt={country?.alt}
            />
            <span className="ml-2 inline">{country?.areaCode}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SelectCountryAreaCode;
