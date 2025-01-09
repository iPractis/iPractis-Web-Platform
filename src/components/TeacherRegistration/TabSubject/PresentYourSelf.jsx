import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import { CameraIcon, LinkIcon, QuestionMark } from "../../Icons";
import React from "react";

const PresentYourSelf = () => {
  return (
    <>
      <SectionHeader
        descriptionText="Introduce yourself to students in the language you'll be teaching and make sure your video meets the requirements to get approved."
        titleText="Present yourself"
        titleIcon={<CameraIcon fillColor={"fill-primary-color-P1"} />}
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-[22px] rounded-[22px] mb-28 mt-16"
      />

      <div className="md:px-8">
        <CustomNextUiInput
          type="text"
          name="videoLink"
          label={
            <div className="mb-2">
              <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                Video link <QuestionMark fillColor={"fill-primary-color-P4"} />
              </span>

              <span className="text-primary-color-P4 ST-3">
                Upload your video on YouTube and paste the link in the field
                below.
              </span>
            </div>
          }
          classNames={{ label: "!-top-16" }}
          labelPlacement="outside"
          placeholder="Enter your video link"
          startContent={
            <InputBGWrapperIcon>
              <LinkIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
        />

        <ul className="ps-4 ST-1 list-disc text-primary-color-P4 mt-4">
          <li>You must appear in the video.</li>
          <li>Record in horizontal mode and at eye level.</li>
          <li>The video aspect ratio should be 16:9</li>
          <li>Your video should be between 1 to 3 minutes long.</li>
          <li>
            You must speak all the languages that you are able to teach with.
          </li>
          <li>
            Highlight your teaching experience and any relevant teaching
            certification(s)
          </li>
          <li>
            Uploaded on YouTube and set to 'Public' visibility. Then provide the
            link in the right area.
          </li>
        </ul>
      </div>
    </>
  );
};

export default PresentYourSelf;
