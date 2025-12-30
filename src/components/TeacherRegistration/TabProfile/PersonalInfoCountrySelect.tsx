// External imports
import { SelectItem, Select } from "@nextui-org/react";

// React imports
import Image from "next/image";

// Icons
import { ChevronDownSmallIcon } from "../../Icons";

const PersonalInfoCountrySelect = ({ field: countryField, countries }) => {
  const selectedCountry = countries?.find(
    (countryItem) => countryItem?.name === countryField?.value
  );

  return (
    <Select
      classNames={{
        trigger:
          "rounded-[10px] shadow-none country-ipractis-dropdown min-h-fit !justify-start !gap-2.5",
        popoverContent: "overflow-y-auto max-h-[20rem] w-[15rem]",
      }}
      selectorIcon={
        <ChevronDownSmallIcon fillcolor={"fill-primary-color-P4"} />
      }
      startContent={
        selectedCountry && (
          <Image
            className="h-[24px] rounded-[5px] w-[40px] object-cover"
            alt={selectedCountry.name}
            src={selectedCountry.flag}
            height={24}
            width={26}
          />
        )
      }
      selectedKeys={new Set([selectedCountry?.name])}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0];
        countryField.onChange(selectedKey);
      }}
      selectionMode="single"
      variant="flat"
    >
      {countries?.map((countryItem) => (
        <SelectItem
          key={countryItem.name}
          textValue={countryItem.name}
          className="flex items-center"
        >
          <div className="flex items-center">
            <Image
              className="h-[24px] rounded-[5px] w-[26px] inline object-cover"
              src={countryItem.flag}
              alt={countryItem.name}
              height={24}
              width={26}
            />

            <span className="inline ml-2">{countryItem.name}</span>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};

export default PersonalInfoCountrySelect;
