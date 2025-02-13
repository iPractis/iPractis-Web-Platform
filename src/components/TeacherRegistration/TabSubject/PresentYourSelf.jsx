import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";
import React from "react";

// Images && icons
import { AnalyticVerticalLinesIcon, CameraIcon, LinkIcon } from "../../Icons";

const PresentYourSelf = ({ draft, errors }) => {
  return (
    <>
      <SectionHeader
        descriptionText="Introduce yourself to students in the language you'll be teaching and make sure your video meets the requirements to get approved."
        titleText="Present yourself"
        titleIcon={<CameraIcon fillColor={"fill-primary-color-P1"} />}
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px] my-20"
      />

      <div className="grid md:grid-cols-2 grid-cols-1 md:px-8">
        <div>
          <CustomNextUiInput
            defaultValue={draft?.videoLink}
            type="text"
            name="videoLink"
            label={
              <SectionHeader
                descriptionText="Upload your video on YouTube and paste the link in the field below."
                titleIcon={
                  <AnalyticVerticalLinesIcon
                    strokeColor={"stroke-primary-color-P1"}
                  />
                }
                titleText="Video Link"
                titleClassName="MT-SB-1"
              />
            }
            classNames={{
              label: "!-top-20",
              inputWrapper:
                findInputErrorZod(errors, "videoLink")?.message &&
                "form-input-error",
            }}
            labelPlacement="outside"
            placeholder="Enter your video link"
            startContent={
              <InputBGWrapperIcon>
                <LinkIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
          />

          <ErrorZodResponse errors={errors} fieldName={"videoLink"} />

          <ul className="ps-4 ST-1 list-disc text-primary-color-P4 mt-8">
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
              Uploaded on YouTube and set to &#39;Public&#39; visibility. Then
              provide the link in the right area.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PresentYourSelf;
