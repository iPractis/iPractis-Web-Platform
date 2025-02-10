import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { countriesSelection } from "@/src/data/dataTeacherRegistration";
import { ChevronDownSmallIcon } from "../../Icons";
import Image from "next/image";

const PersonalInfoNationalitySelect = ({
  selectedNationality,
  setSelectedNationality,
}) => {
  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    const country = countriesSelection.find(
      (country) => country.key === selectedKey
    );
    setSelectedNationality(country);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="country-ipractis-dropdown">
          <Image
            className="w-[40px] h-[24px] rounded-[5px] object-cover"
            alt={selectedNationality.alt}
            src={selectedNationality.image}
          />

          <div className="mx-auto">
            <ChevronDownSmallIcon fillColor={"fill-primary-color-P4"} />
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        selectedKeys={new Set([selectedNationality.key])}
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
