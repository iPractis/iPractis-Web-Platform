import { Controller } from "react-hook-form";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import { Switch } from "@nextui-org/react";
import { CheckIcon, CloseIcon, EarthBorderedIcon } from "../../Icons";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import SectionWrapper from "../../Shared/SectionWrapper";

const BrowserNotifications = ({ control }) => {
  return (
    <SectionWrapper>
      <SectionHeader
        descriptionText="Enable browser notifications to receive important updates and messages from iPractis."
        titleIcon={<EarthBorderedIcon strokeColor={"stroke-primary-color-P1"} />}
        titleText="Browser notification"
        titleClassName="MT-SB-1"
      />

      <SectionContent className="w-full px-[32px]">
        <div className="flex lg:flex-row flex-col lg:items-center items-start gap-8">
          <div className="receiveiPractisNotifications">
            <Controller
              name="receiveiPractisNotifications"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Switch
                    name="receiveiPractisNotifications"
                    isSelected={value}
                    onValueChange={onChange}
                    size="sm"
                    classNames={{
                      wrapper: `${
                        !value ? "bg-secondary-color-S11" : "bg-primary-color-P11"
                      } group-data-[selected=true]:bg-tertiary-color-SC5 p-1.5 pe-4 w-[146px] h-12 mr-0`,
                      thumb:
                        "group-data-[selected=true]:bg-tertiary-color-SC5 bg-septenary-color-MA5 w-9 h-9",
                      label: "text-primary-color-P4 ST-3 ml-8",
                      endContent: "MT-SB-1 text-primary-color-P1 right-4",
                    }}
                    thumbIcon={({ isSelected }) =>
                      isSelected ? (
                        <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                      ) : (
                        <CloseIcon strokeColor={"stroke-primary-color-P12"} />
                      )
                    }
                    endContent={<span>{value ? "Enabled" : "Disabled"}</span>}
                  />
                  <SplitDynamicErrorZod message={error?.message} />
                </>
              )}
            />
          </div>

          <div className="text-primary-color-P4 ST-3">
            iPractis browser notifications let you know when you have an important
            new notification or message. We strongly recommend enabling them.
          </div>
        </div>

        <div className="text-primary-color-P4 ST-3 mt-4">
          To enable browser notifications, please visit your browser settings
          and give notification permissions to iPractis.
        </div>
      </SectionContent>
    </SectionWrapper>
  );
};

export default BrowserNotifications;
