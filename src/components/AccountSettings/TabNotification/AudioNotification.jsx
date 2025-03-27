import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { CheckIcon, CloseBoxIcon, AudioMediumIcon } from "../../Icons";

const AudioNotification = ({ control, isSubmitted }) => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={"Here, you can control the notifications you receive."}
        titleIcon={<AudioMediumIcon fillColor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px]"}
        titleText={"Audio Notification"}
        titleClassName="MT-SB-1"
      />

      <div className="lg:px-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Controller
            name="playSoundOnReceivedNotification"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Switch
                  name="playSoundOnReceivedNotification"
                  isSelected={value}
                  onValueChange={onChange}
                  defaultSelected
                  size="sm"
                  classNames={{
                    wrapper: `${
                      !value && isSubmitted
                        ? "form-input-error"
                        : "bg-primary-color-P6"
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
                  Play a sound when a notification is received.
                </Switch>

                <SplitDynamicErrorZod message={error?.message} />
              </>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Controller
            name="playSoundOnReceivedMessage"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Switch
                  name="playSoundOnReceivedMessage"
                  isSelected={value}
                  defaultSelected
                  onValueChange={onChange}
                  size="sm"
                  classNames={{
                    wrapper: `${
                      !value && isSubmitted
                        ? "form-input-error"
                        : "bg-primary-color-P6"
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
                  Play a sound when a message is received.
                </Switch>

                <SplitDynamicErrorZod message={error?.message} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioNotification;
