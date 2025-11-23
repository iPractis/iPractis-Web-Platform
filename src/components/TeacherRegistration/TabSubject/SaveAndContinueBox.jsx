import ButtonSubmitForm from "../../Shared/ButtonSubmitForm";
import SectionHeader from "../../Shared/SectionHeader";
import { ChevronRightIcon, CircleImportantIcon } from "../../Icons";

const SaveAndContinueBox = ({
  buttonRef,
  ChevronIcon = ChevronRightIcon,
  titleText = "Attention required",
  descriptionText = "These information will be subject to review",
  buttonText = "Save, and continue",
  wrapperSectionHeaderClassName = "",
  titleIcon = <CircleImportantIcon />,
}) => {
  return (
    <div className="mt-20">
      <SectionHeader
        descriptionText={descriptionText}
        wrapperSectionHeaderClassName={`relative bg-quaternary-color-A11 p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between ${wrapperSectionHeaderClassName}`}
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            {titleIcon}
          </div>
        }
        titleText={titleText}
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
      >
        <ButtonSubmitForm
          buttonClassName="absolute top-[32px] bottom-[32px] right-[32px] w-[190px] h-[48px] bg-white rounded-[16px] p-[6px] flex items-center justify-between gap-[2px] text-primary-color-P1 cursor-pointer border border-transparent hover:border-primary-color-P1 transition-colors"
          ref={buttonRef}
          showLoadingText={true}
          loadingText="Saving..."
          spinnerClassName="w-4 h-4 text-primary-color-P1"
        >
          <span className="ST-3 ml-[8px] whitespace-nowrap">{buttonText}</span>
          <div className="w-[36px] h-[36px] bg-[#F8F7F5] rounded-[10px] flex items-center justify-end p-[6px]">
            <ChevronIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        </ButtonSubmitForm>
      </SectionHeader>
    </div>
  );
};

export default SaveAndContinueBox;
