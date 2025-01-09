import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";

import { useState } from "react";

// Icons
import {
  AddBoxIcon,
  CalendarAddIcon,
  CalendarCloseIcon,
  ChevronDownIcon,
  LuggageBiggerIcon,
  TopArrowCloudIcon,
  TrashBinIcon,
  UserTieIcon,
} from "../../Icons";
import { DatePicker } from "@nextui-org/react";
import CustomNextUiTextarea from "../../Globals/CustomNextUiTextarea";

const TabBackground = ({ activeTab }) => {
  const [isOpenFromCalendar, setIsOpenFromCalendar] = useState(false);
  const [isOpenToCalendar, setIsOpenToCalendar] = useState(false);

  return (
    <div className={`${activeTab !== 2 && "hidden"}`}>
      <SectionHeader
        descriptionText="Tell us about your career and experience"
        titleIcon={<UserTieIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8"
        }
        titleText="Experience"
        titleClassName="MT-SB-1"
      />

      <WhiteSpaceWrapper className={"bg-primary-color-P12"}>
        {/* To create a new Professional Experience */}
        <button
          type="button"
          className="btn btn-septenary flex items-center justify-between w-full rounded-2xl px-4 py-2.5 mb-8"
        >
          <span className="MT-1 text-primary-color-P4">
            Add professional experience
          </span>{" "}
          <AddBoxIcon fillColor={"fill-primary-color-P4"} />
        </button>

        {/* Input of company, download, and recycle bin */}
        <div className="flex gap-2.5">
          <div className="flex-[70%]">
            <CustomNextUiInput
              type="text"
              name="companyProffesionalExperience"
              placeholder="Example: Google"
              startContent={
                <InputBGWrapperIcon>
                  <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
            />
          </div>

          <div className="flex-1">
            <button type="button">
              <InputBGWrapperIcon
                className={
                  "btn-septenary rounded-2xl bg-primary-color-P11 w-[48px] h-[48px]"
                }
              >
                <TopArrowCloudIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            </button>
          </div>

          <div className="flex-1">
            <button type="button">
              <InputBGWrapperIcon
                className={
                  "btn-septenary rounded-2xl bg-primary-color-P11 w-[48px] h-[48px]"
                }
              >
                <TrashBinIcon
                  strokeColor={"stroke-primary-color-P4"}
                  fillColor={"fill-primary-color-P4"}
                />
              </InputBGWrapperIcon>
            </button>
          </div>
        </div>

        {/* Calendars FROM and TO */}
        <div className="flex items-center gap-2.5 my-2.5">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex-[50%]">
                {" "}
                <CustomNextUiInput
                  type="text"
                  name="fromCalendar"
                  placeholder="From"
                  startContent={
                    <InputBGWrapperIcon>
                      <CalendarAddIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                />
              </div>

              <div className="flex-1">
                <button
                  className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
                  onClick={() => setIsOpenFromCalendar(!isOpenFromCalendar)}
                  type="button"
                >
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex-[50%]">
                <CustomNextUiInput
                  type="text"
                  name="toCalendar"
                  placeholder="To"
                  startContent={
                    <InputBGWrapperIcon>
                      <CalendarCloseIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                />
              </div>

              <div className="flex-1">
                <button
                  className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
                  onClick={() => setIsOpenToCalendar(!isOpenToCalendar)}
                  type="button"
                >
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enter a text */}
        <CustomNextUiTextarea
          classNames={{
            input: "h-[150px]",
          }}
          placeholder="Enter a text"
          size="primaryiPractis"
          name="textProfessionalExperience"
          disableAutosize
        />
      </WhiteSpaceWrapper>
    </div>
  );
};

export default TabBackground;
