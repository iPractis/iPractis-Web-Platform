import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { SearchIcon } from "../../Icons";

const NavSearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-[362px] ps-4 pe-16 rounded-2xl h-10 ST-1 outline-none text-primary-color-P1 placeholder:text-primary-color-P1 hover:bg-secondary-color-S9"
        placeholder="What are you looking for?"
      />

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
