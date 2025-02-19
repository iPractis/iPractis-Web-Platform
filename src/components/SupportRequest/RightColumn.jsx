import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import CustomNextUiTextarea from "../Shared/CustomNextUiTextarea";
import { errorFormMessages } from "@/src/data/dataSupportRequest";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import SectionHeader from "../Shared/SectionHeader";

// Icons
import { WrenchIcon } from "../Icons";

const RightColumn = ({ frontEndErrors, backEndErrors, register, watch }) => {
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
        <InputLeftStickStatus
          inputBarStatusClassName={getLeftStickInputColorStatus(
            frontEndErrors,
            backEndErrors,
            watch("situation")
          )}
        >
          <CustomNextUiTextarea
            classNames={{
              inputWrapper:
                (frontEndErrors?.situation?.type || backEndErrors?.message) &&
                "form-input-error",
              input: "h-[169px]",
            }}
            {...register("situation", {
              required:
                "Invalid Situation --- Please, describe the situation of the problem.",
            })}
            placeholder="Describe the situation"
            size="primaryiPractis"
            name="situation"
            disableAutosize
          />
        </InputLeftStickStatus>

        <DynamicInputErrorMessage
          errorMessages={errorFormMessages}
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          fieldName="situation"
        />
      </div>
    </article>
  );
};

export default RightColumn;
