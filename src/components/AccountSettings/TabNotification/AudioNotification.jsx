import { Controller } from "react-hook-form";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import { Switch } from "@nextui-org/react";
import { CheckIcon, CloseBoxIcon, AudioSmallIcon } from "../../Icons";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import SectionWrapper from "../../Shared/SectionWrapper";

const AudioNotification = ({ control }) => {
  return (
    <SectionWrapper>
      <SectionHeader
        descriptionText="Text"
        titleIcon={<AudioSmallIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Audio notifications"
        titleClassName="MT-SB-1"
      />

      <SectionContent className="w-full mx-[32px] space-y-[16px]">
        {/* 🔈 Play sound on notification */}
        <Controller
          name="playSoundOnReceivedNotification"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Switch
                name="playSoundOnReceivedNotification"
                isSelected={value}
                onValueChange={onChange}
                size="sm"
                classNames={{
                  wrapper: `${
                    !value ? "bg-primary-color-P6" : "bg-primary-color-P6"
                  } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                  thumb: "bg-primary-color-P12",
                  label: "text-primary-color-P1 ST-4 ml-[8px]",
                }}
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                  ) : (
                    <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                  )
                }
              >
                Play a sound when a notification is received.
              </Switch>

              <SplitDynamicErrorZod message={error?.message} />
            </>
          )}
        />

        {/* 💬 Play sound on message */}
        <Controller
          name="playSoundOnReceivedMessage"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Switch
                name="playSoundOnReceivedMessage"
                isSelected={value}
                onValueChange={onChange}
                size="sm"
                classNames={{
                  wrapper: `${
                    !value ? "bg-primary-color-P6" : "bg-primary-color-P6"
                  } group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit`,
                  thumb: "bg-primary-color-P12",
                  label: "text-primary-color-P1 ST-4 ml-[8px]",
                }}
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
                  ) : (
                    <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
                  )
                }
              >
                Play a sound when a message is received.
              </Switch>

              <SplitDynamicErrorZod message={error?.message} />
            </>
          )}
        />
      </SectionContent>
    </SectionWrapper>
  );
};

export default AudioNotification;
