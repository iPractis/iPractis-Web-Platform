import ButtonSubmitForm from "../../Shared/ButtonSubmitForm";
import SectionHeader from "../../Shared/SectionHeader";
import { ChevronRightIcon, CircleImportantIcon } from "../../Icons";
import { twMerge } from "tailwind-merge";
import SectionWrapper from "../../Shared/SectionWrapper";

const SaveAndContinueBox = ({
  buttonRef,
  ChevronIcon = ChevronRightIcon,
  titleText = "Attention required",
  descriptionText = "These information will be subject to review",
  buttonText = "Save, and continue",
  wrapperSectionHeaderClassName,
  titleIcon = <CircleImportantIcon />,
}) => {
  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={titleIcon}
        titleText={titleText}
        descriptionText={descriptionText}
        wrapperSectionHeaderClassName={twMerge("bg-quaternary-color-A11", wrapperSectionHeaderClassName)}
        rightElement={
          <ButtonSubmitForm
            buttonClassName="flex items-center justify-between bg-primary-color-P12 hover:bg-secondary-color-S8 transition-colors p-[6px] pl-[16px] rounded-[16px] gap-[16px]"
            ref={buttonRef}
            showLoadingText={true}
            loadingText="Saving..."
            spinnerClassName="w-4 h-4 text-primary-color-P1"
          >
            <span className="ST-3">{buttonText}</span>
            <div className="bg-secondary-color-S11 p-[8px] rounded-[10px]">
              <ChevronIcon fillcolor={"fill-primary-color-P1"} />
            </div>
          </ButtonSubmitForm>
        }
      />

    </SectionWrapper>
  );
};

export default SaveAndContinueBox;
