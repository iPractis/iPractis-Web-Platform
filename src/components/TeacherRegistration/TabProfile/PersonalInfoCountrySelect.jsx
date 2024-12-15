import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { countriesSelection } from "@/src/data/dataTeacherRegistration";
import { ChevronDownSmallIcon } from "../../Icons";
import { useState } from "react";
import Image from "next/image";

// Icons && images
import ukFlag from "@/public/flags/united-kingdom.png";

const PersonalInfoCountrySelect = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="country-ipractis-dropdown">
          <Image
            className="w-[26px] h-[24px] rounded-[5px] object-cover"
            alt="Country Flag"
            src={ukFlag}
          />

          <div className="mx-auto">
            <ChevronDownSmallIcon />
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Single Country Selection"
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
        disallowEmptySelection
        selectionMode="single"
        variant="flat"
      >
        {countriesSelection?.map((country) => (
          <DropdownItem textValue={country?.alt} key={country?.key}>
            <Image
              className="w-[26px] h-[24px] rounded-[5px] object-cover"
              src={country?.image}
              alt={country?.alt}
            />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default PersonalInfoCountrySelect;
