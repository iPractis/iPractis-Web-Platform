import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Icons && images
import unitedKingdom from "@/public/flags/united-kingdom.png";
import spanish from "@/public/flags/spain.png";
import france from "@/public/flags/france.png";
import italy from "@/public/flags/italy.png";

import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import { DollarSignIcon, QuestionMark } from "../../Icons";

const AveragePrice = ({ subjectToTeach, errors, draft }) => {
  const subjectImages = {
    English: unitedKingdom,
    French: france,
    Spanish: spanish,
    Italian: italy,
    Mandarin: null,
    German: null,
    Arabic: null,
  };

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
          <div className="flex w-fit animation-fade cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-[.9rem] items-center mt-8 mb-14">
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
    </>
  );
};

export default AveragePrice;
