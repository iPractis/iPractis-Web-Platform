import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { Select, SelectItem } from "@nextui-org/react";
import { searchBarSubjects } from "@/src/data/dataHome";

// Icons
import { ChevronDownMediumIcon, SearchIcon } from "../../Icons";

const NavSearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-[362px] ps-4 pe-28 rounded-2xl h-10 ST-1 outline-none text-primary-color-P1 placeholder:text-primary-color-P1 hover:bg-secondary-color-S9"
        placeholder="What are you looking for?"
      />

      {/* Select subject to search for */}
      <div className="absolute top-0 right-11">
        <Select
          placeholder="Select a subject"
          selectorIcon={<span></span>}
          popoverProps={{
            classNames: {
              content: "min-w-[200px]",
            },
          }}
          classNames={{
            trigger:
              "bg-transparent data-[hover=true]:bg-transparent shadow-none px-0",
            innerWrapper: "w-auto gap-[2px]",
            value: "w-auto text-primary-color-P1 ST-1",
          }}
          endContent={
            <ChevronDownMediumIcon fillColor={"fill-primary-color-P1"} />
          }
          defaultSelectedKeys={["english"]}
          items={searchBarSubjects}
        >
          {(subject) => <SelectItem>{subject?.subject}</SelectItem>}
        </Select>
      </div>

      {/* Search button */}
      <button type="button" className="absolute right-2 top-[7px]">
        <InputBGWrapperIcon
          className={"bg-primary-color-P1 p-0 w-[26px] h-[26px]"}
        >
          <SearchIcon className={"fill-primary-color-P12"} />
        </InputBGWrapperIcon>
      </button>
    </div>
  );
};

export default NavSearchBar;
