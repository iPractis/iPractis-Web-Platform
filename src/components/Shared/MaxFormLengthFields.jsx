import ErrorMessageiPractis from "./ErrorMessageiPractis";
import CustomNextUiTextarea from "./CustomNextUiTextarea";
import CustomNextUiInput from "./CustomNextUiInput";

// Icons
import { QuestionMark } from "../Icons";

export const CustomNextUiTextareaWithMaxLength = ({
  labelDisabled = false,
  labelClassName,
  maxCharactersLengthText = 1,
  onChange,
  value,
  labelTitle,
  labelSubtitle,
  placeholder,
  maxCharactersLength,
  inputClassName,
  typeError,
  descError,
  nameTextarea,
  defaultValue,
  backgroundError,
  inputProps,
}) => {
  const exceedValueMaxLength = value?.length === maxCharactersLength;

  return (
    <>
      <CustomNextUiTextarea
        defaultValue={defaultValue}
        name={nameTextarea}
        label={
          // If labelDisabled is false, then we display it!
          !labelDisabled && (
            <div className="mb-2">
              <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                {labelTitle}{" "}
                <QuestionMark fillcolor={"fill-primary-color-P4"} />
              </span>

              <span className="text-primary-color-P4 ST-3">
                {labelSubtitle}
              </span>
            </div>
          )
        }
        {...inputProps}
        onChange={onChange}
        value={value}
        labelPlacement="outside"
        placeholder={placeholder}
        classNames={{
          input: [inputClassName],
          inputWrapper: [
            (exceedValueMaxLength && "form-input-error") ||
            (backgroundError && "form-input-error"),
            "!bg-[#f8f7f5]"
          ],
          label: [labelClassName],
          label: "ps-[5px]"
        }}
        size="primaryiPractis"
        disableAutosize
      />

      <div
        className={`flex items-center justify-between mt-0.5 ST-2 px-2.5 text-primary-color-P4`}
      >
        <h4>
          {maxCharactersLengthText === 1
            ? `Limited to ${maxCharactersLength} characters`
            : `Supporting text`}
        </h4>
        <h3>
          {value?.length}/{maxCharactersLength}
        </h3>
      </div>

      {exceedValueMaxLength && (
        <ErrorMessageiPractis typeError={typeError} descError={descError} />
      )}
    </>
  );
};

export const CustomNextUiInputWithMaxLength = ({
  defaultValue,
  labelDisabled = false,
  endContent = false,
  startContent = false,
  labelClassName,
  onChange,
  value,
  labelTitle,
  labelSubtitle,
  placeholder,
  maxCharactersLength,
  inputClassName,
  typeError,
  descError,
  nameInput,
  inputType,
  backgroundError,
  base,
  inputProps,
}) => {
  const exceedValueMaxLength = value?.length === maxCharactersLength;

  return (
    <>
      <CustomNextUiInput
        defaultValue={defaultValue}
        {...inputProps}
        onChange={onChange}
        value={value}
        type={inputType}
        name={nameInput}
        placeholder={placeholder}
        label={
          // If labelDisabled is false, then we display it!
          !labelDisabled && (
            <div className="mb-2">
              <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                {labelTitle}{" "}
                <QuestionMark fillcolor={"fill-primary-color-P4"} />
              </span>

              <span className="text-primary-color-P4 ST-3">
                {labelSubtitle}
              </span>
            </div>
          )
        }
        labelPlacement="outside"
        startContent={startContent}
        endContent={endContent}
        classNames={{
          input: [inputClassName],
          inputWrapper:
            (exceedValueMaxLength && "form-input-error") ||
            (backgroundError && "form-input-error"),
          label: [labelClassName],
          base: [base]
        }}
      />

      <div
        className={`flex items-center justify-between mt-0.5 ST-2 px-2.5 text-primary-color-P4`}
      >
        <h4>Limited to {maxCharactersLength} characters</h4>
        <h4>
          {value?.length}/{maxCharactersLength}
        </h4>
      </div>

      {exceedValueMaxLength && (
        <ErrorMessageiPractis typeError={typeError} descError={descError} />
      )}
    </>
  );
};
