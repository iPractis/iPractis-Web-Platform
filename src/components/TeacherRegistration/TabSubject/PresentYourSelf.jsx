import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { useController } from "react-hook-form";

// Images && icons
import {
  AnalyticVerticalLinesIcon,
  LinkHorizontalIcon,
  CameraIcon,
} from "../../Icons";

const PresentYourSelf = ({ control, errors }) => {
  const {
    field: videoLink,
    fieldState: { error: videoLinkError },
  } = useController({
    name: "videoLink",
    control,
  });

  return (
    <>
      <SectionHeader
        descriptionText="Introduce yourself to your future students"
        wrapperSectionHeaderClassName="relative bg-[#F8F7F5] lg:p-4 p-8 lg:rounded-[30px] rounded-[32px] lg:max-w-[1000px] max-w-[398px] lg:h-[112px] h-[122px] flex items-center justify-between my-16"
        titleIcon={
          <div className="absolute top-[32px] bottom-[32px] left-[32px] w-[48px] h-[48px] rounded-[20px] bg-white flex items-center justify-center gap-[10px] p-[14px]">
            <CameraIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        }
        titleText="Introduce yourself"
        titleClassName="MT-SB-1 lg:ml-[80px] md:ml-[60px] ml-[80px]"
        descriptionClassName="lg:ml-[80px] md:ml-[60px] ml-[80px]"
      />

      <div className="lg:mx-[285px] md:mx-[100px] mx-4 lg:mt-[120px] md:mt-[120px] mt-[120px]">
        <div className="w-full">
        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              videoLink.value,
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
                inputWrapper: `${videoLinkError?.message ? "form-input-error" : ""} !bg-[#F8F7F5]`,
              }}
              value={videoLink.value}
              onChange={videoLink.onChange}
              onBlur={videoLink.onBlur}
              labelPlacement="outside"
              placeholder="Enter your video link"
              startContent={
                <InputBGWrapperIcon>
                  <LinkHorizontalIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
            />
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={videoLinkError?.message} />

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
      </div>
    </>
  );
};

export default PresentYourSelf;
