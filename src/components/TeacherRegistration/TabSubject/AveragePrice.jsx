import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import { subjectImages } from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";

// React imports
import { useController } from "react-hook-form";
import Image from "next/image";

// Icons
import { DollarSignIcon, QuestionMark } from "../../Icons";

const AveragePrice = ({ control, errors, watch }) => {
  const subjectToTeachImage = subjectImages[watch("subject")];

  const {
    field: hourlyPrice,
    fieldState: { error: hourlyPriceError },
  } = useController({
    name: "hourlyPrice",
    control,
  });

  return (
    <>
      <SectionHeader
        descriptionText="Lessons rate matter, guiding students to affordability and value."
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] lg:p-4 p-8 lg:rounded-[30px] rounded-[32px] lg:max-w-[1000px] max-w-[398px] lg:h-[112px] h-[122px] flex items-center justify-between my-16"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[16px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <DollarSignIcon fillColor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Class Rate"
        titleClassName="MT-SB-1 lg:ml-[80px] md:ml-[60px] ml-[80px]"
        descriptionClassName="lg:ml-[80px] md:ml-[60px] ml-[80px]"
      />

      <div className="lg:mx-[285px] md:mx-[100px] mx-4">
        <div className="w-full">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              hourlyPrice.value,
              "hourlyPrice"
            )} -translate-y-0 top-[54%]`}
          >
            <div className="flex items-end gap-2 mt-7">
              <CustomNextUiInput
                type="text"
                name="hourlyPrice"
                placeholder="Set your hourly base rate"
                classNames={{
                  label: "!-top-12 ms-0.5",
                  inputWrapper: `${hourlyPriceError?.message ? "form-input-error" : ""} !bg-[#F8F7F5]`,
                }}
                label={
                  <div className="flex flex-col">
                    <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                      Private lesson rate
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>

                    <div className="self-start">
                      <span className=" text-primary-color-P4 ST-3">
                        Define your rate for 1:1 private lesson.
                      </span>
                    </div>
                  </div>
                }
                labelPlacement="outside"
                startContent={
                  <InputBGWrapperIcon>
                    <DollarSignIcon fillColor={"fill-primary-color-P4"} />
                  </InputBGWrapperIcon>
                }
                value={hourlyPrice.value}
                onChange={hourlyPrice.onChange}
                onBlur={hourlyPrice.onBlur}
              />
            </div>
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={hourlyPriceError?.message} />

          {subjectToTeachImage && (
            <div className="flex w-fit animation-fade cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-[.9rem] items-center mt-4">
              <div className="me-3">
                <Image
                  src={subjectToTeachImage}
                  alt={"Country Image"}
                  className="w-[51px]"
                />
              </div>

              <div>
                <h3 className="ST-SB-1">Average price</h3>
                <p className="text-primary-color-P6 group-active:text-primary-color-P12 ST-1">
                  13 USD/30 mins
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AveragePrice;
