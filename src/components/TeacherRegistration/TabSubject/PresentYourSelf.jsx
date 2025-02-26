import { DynamicInputErrorMessageWithZod } from "../../Shared/DynamicInputErrorMessageWithZod";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";

// Images && icons
import {
  AnalyticVerticalLinesIcon,
  LinkHorizontalIcon,
  CameraIcon,
} from "../../Icons";

const PresentYourSelf = ({
  frontEndErrors,
  backEndErrors,
  register,
  watch,
}) => {
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
          <InputLeftStickStatus
            inputBarStatusClassName={`${getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("videoLink"),
              "videoLink"
            )}`}
          >
            <CustomNextUiInput
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
                  (frontEndErrors?.videoLink?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
              {...register("videoLink")}
              labelPlacement="outside"
              placeholder="Enter your video link"
              startContent={
                <InputBGWrapperIcon>
                  <LinkHorizontalIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessageWithZod
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="videoLink"
          />

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
