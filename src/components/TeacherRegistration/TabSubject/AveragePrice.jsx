import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Icons && images
import unitedKingdom from "@/public/flags/united-kingdom.png";
import { DollarSignIcon, QuestionMark } from "../../Icons";

const AveragePrice = () => {
  return (
    <div className="flex-1">
      <SectionHeader
        descriptionText="Price is crucial for students when choosing a tutor as it determines affordability and value for money."
        titleIcon={<DollarSignIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Average price"
        titleClassName="MT-SB-1"
      />

      <div className="flex w-fit animation-fade cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-[.9rem] items-center mt-8 mb-14">
        <div className="me-3">
          <Image
            alt={"Country Image"}
            src={unitedKingdom}
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

      <div className="flex items-end gap-2 mt-7">
        <CustomNextUiInput
          type="text"
          name="hourlyBaseRate"
          placeholder="Set your hourly base rate"
          classNames={{
            label: "!-top-11",
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
    </div>
  );
};

export default AveragePrice;
