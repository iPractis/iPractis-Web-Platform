import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";
import { subjectImages } from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";

import Image from "next/image";

import { DollarSignIcon, QuestionMark } from "../../Icons";

const AveragePrice = ({ subjectToTeach, errors, draft }) => {
  const subjectToTeachImage = subjectImages[subjectToTeach];

  return (
    <>
      <SectionHeader
        descriptionText="View key details and manage your transactions."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px] mb-[50px] mt-16"
        titleIcon={<DollarSignIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Financial Summary"
        titleClassName="MT-SB-1"
      />

      <div className="md:px-8">
        <SectionHeader
          descriptionText="Price is crucial for students when choosing a tutor as it determines affordability and value for money."
          titleIcon={<DollarSignIcon fillColor={"fill-primary-color-P1"} />}
          titleText="Average price"
          titleClassName="MT-SB-1"
          wrapperSectionHeaderClassName="mb-16"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-end">
          <div>
            <div className="flex items-end gap-2 mt-7">
              <CustomNextUiInput
                defaultValue={draft?.hourlyPrice}
                type="text"
                name="hourlyPrice"
                placeholder="Set your hourly base rate"
                classNames={{
                  label: "!-top-11",
                  inputWrapper:
                    findInputErrorZod(errors, "hourlyPrice")?.message &&
                    "form-input-error",
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
              />
            </div>

            <ErrorZodResponse errors={errors} fieldName={"hourlyPrice"} />
          </div>

          {subjectToTeachImage && (
            <div className="flex w-fit animation-fade cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-[.9rem] items-center">
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
