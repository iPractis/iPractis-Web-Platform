import CustomNextUiTextarea from "../Globals/CustomNextUiTextarea";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import SectionHeader from "../Globals/SectionHeader";
import { WrenchIcon } from "../Icons";

const RightColumn = ({ isValidSituationError, error }) => {
  return (
    <article className="">
      <SectionHeader
        descriptionText="Briefly explain the problem to help us assist you."
        wrapperSectionHeaderClassName="sm:px-4"
        titleText="Describe Your Issue"
        descriptionClassName="mt-1"
        titleIcon={<WrenchIcon />}
        titleClassName="MT-SB-1"
      />

      <div className="my-[50px] w-full">
        <CustomNextUiTextarea
          classNames={{
            inputWrapper: isValidSituationError && "form-input-error",
            input: "h-[169px]",
          }}
          placeholder="Describe the situation"
          size="primaryiPractis"
          name="situation"
          disableAutosize
        />

        {isValidSituationError && (
          <ErrorMessageiPractis
            typeError={error?.title}
            descError={error?.message}
          />
        )}
      </div>
    </article>
  );
};

export default RightColumn;
