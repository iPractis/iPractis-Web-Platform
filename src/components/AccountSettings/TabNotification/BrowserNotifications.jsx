import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import SectionHeader from "../../Shared/SectionHeader";

// External imports
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/react";

// Icons
import { CheckIcon, CloseIcon, EarthBorderedIcon } from "../../Icons";

const BrowserNotifications = ({ isSubmitted, control }) => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={
          "Enable browser notifications to receive important updates and messages from iPractis."
        }
        titleIcon={
          <EarthBorderedIcon strokeColor={"stroke-primary-color-P1"} />
        }
        titleText={"Browser Notifications"}
        descriptionClassName={"mt-[4px]"}
        titleClassName="MT-SB-1"
      />

      <div className="lg:px-8">
        <div className="flex lg:flex-row flex-col lg:items-center items-start gap-8">
          <div className="receiveiPractisNotifications">
            <Controller
              name="receiveiPractisNotifications"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Switch
                    name="receiveiPractisNotifications"
                    isSelected={value}
                    onValueChange={onChange}
                    size="sm"
                    classNames={{
                      wrapper: `${
                        !value && isSubmitted
                          ? "form-input-error"
                          : "bg-primary-color-P11"
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
                        <CloseIcon strokeColor={"stroke-primary-color-P1"} />
                      )
                    }
                    endContent={<span>Disabled</span>}
                  />

                  <SplitDynamicErrorZod message={error?.message} />
                </>
              )}
            />
          </div>

          <div className="text-primary-color-P4 ST-3">
            iPractis browser notifications let you know when you have an
            important new notification or message. We strongly recommend
            enabling them.
          </div>
        </div>

        <div className="text-primary-color-P4 ST-3 mt-8">
          To enable browser notifications, please visit your browser settings
          and give notification permissions to iPractis.
        </div>
      </div>
    </div>
  );
};

export default BrowserNotifications;
