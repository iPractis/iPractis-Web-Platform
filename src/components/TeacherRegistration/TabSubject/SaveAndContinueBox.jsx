import ButtonSubmitForm from "../../Shared/ButtonSubmitForm";
import SectionHeader from "../../Shared/SectionHeader";
import { ChevronRightIcon, CircleImportantIcon } from "../../Icons";

const SaveAndContinueBox = ({ buttonRef }) => {
  return (
    <div className="mt-20">
      <SectionHeader
        descriptionText="These information will be subject to review"
        wrapperSectionHeaderClassName="relative bg-[#FFF4B8] p-4 rounded-[30px] max-w-[1000px] h-[112px] flex items-center justify-between"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <CircleImportantIcon />
          </div>
        }
        titleText="Attention required"
        titleClassName="MT-SB-1 ml-[80px]"
        descriptionClassName="ml-[80px]"
      >
        <div className="absolute top-[32px] bottom-[32px] right-[32px] w-[190px] h-[48px] bg-white rounded-[16px] p-[6px] flex items-center justify-between gap-[2px]">
          <ButtonSubmitForm
            buttonClassName="text-primary-color-P1 ST-3 ml-[8px] bg-transparent border-0 p-0 cursor-pointer flex items-center whitespace-nowrap"
            ref={buttonRef}
          >
            Save, and continue
          </ButtonSubmitForm>
          <div className="mr-[1px] w-[36px] h-[36px] bg-[#F8F7F5] rounded-[10px] flex items-center justify-end p-[6px]">
            <ChevronRightIcon fillColor={"fill-primary-color-P1"} />
          </div>
        </div>
      </SectionHeader>
    </div>
  );
};

export default SaveAndContinueBox;
