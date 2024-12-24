import AboutYourselfMasteredLanguages from "./AboutYourselfMasteredLanguages";
import CustomNextUiTextarea from "../../Globals/CustomNextUiTextarea";
import WhiteSpaceWrapper from "../../Globals/WhiteSpaceWrapper";
import SectionHeader from "../../Globals/SectionHeader";
import { QuestionMark, UserIcon } from "../../Icons";

const AboutYourself = () => {
  return (
    <WhiteSpaceWrapper className={"space-y-[50px]"}>
      <SectionHeader
        descriptionText="Capture prospective students attention with compelling details about you as a teacher"
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Tell students about yourself"
        titleClassName="MT-SB-1"
      />

      <div className="flex flex-col sm:flex-row sm:gap-[50px] gap-6">
        <AboutYourselfMasteredLanguages />

        <div className="flex-1 w-full">
          <CustomNextUiTextarea
            label={
              <div className="mb-2">
                <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                  Write Introduction about yourself{" "}
                  <QuestionMark fillColor={"fill-primary-color-P4"} />
                </span>

                <span className="text-primary-color-P4 ST-3">
                  Introduce yourself and highlight your unique interests.
                </span>
              </div>
            }
            labelPlacement="outside"
            placeholder="Enter a text"
            classNames={{ input: "h-[150px]" }}
            size="primaryiPractis"
            disableAutosize
          />

          <div className="flex items-center justify-between text-primary-color-P4 mt-0.5 ST-2">
            <h4>Limited to 1000 characters</h4>
            <h4>0/1000</h4>
          </div>
        </div>
      </div>
    </WhiteSpaceWrapper>
  );
};

export default AboutYourself;
