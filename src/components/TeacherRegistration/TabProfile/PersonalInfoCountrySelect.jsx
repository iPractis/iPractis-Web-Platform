import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
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
        <DropdownItem key="text">
          <Image
            className="w-[26px] h-[24px] rounded-[5px] object-cover"
            alt="Country Flag"
            src={ukFlag}
          />
        </DropdownItem>

        <DropdownItem key="portugal">
          <Image
            className="w-[26px] h-[24px] rounded-[5px] object-cover"
            alt="Country Flag"
            src={ukFlag}
          />
        </DropdownItem>

        <DropdownItem key="spain">
          <Image
            className="w-[26px] h-[24px] rounded-[5px] object-cover"
            alt="Country Flag"
            src={ukFlag}
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PersonalInfoCountrySelect;
