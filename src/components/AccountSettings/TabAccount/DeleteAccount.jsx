import { RightArrowMediumIcon, TrashBinSmallerIcon } from "../../Icons";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";

// Icons

const DeleteAccount = () => {
  return (
    <SectionHeader
      wrapperSectionHeaderClassName={"bg-primary-color-P1"}
      titleIcon={
        <TrashBinSmallerIcon
          fillcolor={"fill-primary-color-P1"}
          strokeColor={"stroke-primary-color-P1"}
        />
      }
      titleText={"Permanently delete my account"}
      titleClassName="MT-SB-1 text-primary-color-P12"
      descriptionText={
        "If you no longer wish to use iPractis, you can permanently delete your account."
      }
      descriptionClassName="ST-3 text-primary-color-P12"
      rightElement={
        <button
          className={"bg-septenary-color-MA6 p-[6px]  rounded-[16px] flex items-center gap-2"}
          type="button"
        >
          <span className="ST-SB-3 text-primary-color-P12 px-[6px]">Delete my account</span>{" "}
          <InputBGWrapperIcon>
            <RightArrowMediumIcon
              fillcolor={"fill-septenary-color-MA6"}
              strokeColor={"stroke-septenary-color-MA6"}
            />
          </InputBGWrapperIcon>
        </button>
      }
    />
  );
};

export default DeleteAccount;
