import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import { TrashBinSmallerIcon } from "../../Icons";

const DeleteAccount = () => {
  return (
    <SectionHeader
      wrapperSectionHeaderClassName={
        "flex justify-between bg-primary-color-P11 rounded-[32px] p-8 mb-8"
      }
      descriptionText={
        "If you no longer wish to use iPractis, you can permanently delete your account."
      }
      titleIcon={
        <TrashBinSmallerIcon
          fillcolor={"fill-primary-color-P1"}
          strokeColor={"stroke-primary-color-P1"}
        />
      }
      titleText={"Delete Your Account Permanently"}
      headerContainerClassName="flex-[40%]"
      descriptionClassName={"mt-[4px]"}
      titleClassName="MT-SB-1"
    >
      <div className="flex-1">
        <button
          className={`btn btn-danger flex w-full gap-2.5 p-1.5 ps-2.5 items-center justify-between rounded-2xl`}
          type="button"
        >
          <span className="MT-1 px-1.5">Delete account</span>{" "}
          <InputBGWrapperIcon>
            <TrashBinSmallerIcon
              fillcolor={"fill-septenary-color-MA6"}
              strokeColor={"stroke-septenary-color-MA6"}
            />
          </InputBGWrapperIcon>
        </button>
      </div>
    </SectionHeader>
  );
};

export default DeleteAccount;
