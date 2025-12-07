import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { CheckIcon, CloseBoxIcon, UserSpeakingRightIcon } from "../../Icons";

const ProfileDisplaySettings = ({ control }) => {
  return (
    <SectionWrapper>
      <SectionHeader
        titleIcon={<UserSpeakingRightIcon fillcolor="fill-primary-color-P1" />}
        titleText="Profile display settings"
        descriptionText="Text"
        titleClassName="MT-SB-1"
      />

      <SectionContent className="mx-[32px]">
        <div className="flex flex-col space-y-4">
          {/* Show my profile publicly */}
          <Controller
            name="showProfilePublicly"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                name="showProfilePublicly"
                isSelected={value}
                onValueChange={onChange}
                size="sm"
                classNames={{
                  wrapper: `${
                    !value ? "bg-primary-color-P6" : ""
                  } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                  thumb: "bg-primary-color-P12",
                  label: "text-primary-color-P1 ST-4 ml-1",
                }}
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                  ) : (
                    <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                  )
                }
              >
                Show my profile publicly
              </Switch>
            )}
          />

          {/* Show achievements */}
          <Controller
            name="showAchievements"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                name="showAchievements"
                isSelected={value}
                onValueChange={onChange}
                size="sm"
                classNames={{
                  wrapper: `${
                    !value ? "bg-primary-color-P6" : ""
                  } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                  thumb: "bg-primary-color-P12",
                  label: "text-primary-color-P1 ST-4 ml-1",
                }}
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                  ) : (
                    <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                  )
                }
              >
                Show achievements
              </Switch>
            )}
          />
        </div>
      </SectionContent>
    </SectionWrapper>
  );
};

export default ProfileDisplaySettings;
