import { Controller } from "react-hook-form";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import IconHeader from "../../Shared/IconHeader";
import { EarthBorderedIcon, MailIcon } from "../../Icons";

const NotificationItem = ({
  hasMailOption = true,
  hasWebOption = true,
  description,
  items = [],
  title,
  icon,
  control,
  notificationKey = "",
}) => {
  return (
    <article className="flex items-start gap-[16px]">
      {/* 🌐 Web Column */}
      {hasWebOption && (
        <div className="bg-primary-color-P11 p-[6px] pb-[24px] rounded-[22px]">
          <InputBGWrapperIcon className="p-[14px] rounded-[16px] flex items-center justify-center">
            <EarthBorderedIcon strokeColor={"stroke-primary-color-P1"} />
          </InputBGWrapperIcon>

          <div className="flex flex-col items-center justify-center mt-[16px]">
            {items.map((item) => {
              const fieldName = `notifications.${notificationKey}_${item.replace(/\s+/g, "")}_web`;

              return (
                <div key={fieldName} className="h-[32px] flex items-center justify-center">
                  <Controller
                    name={fieldName}
                    control={control}
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <CustomNextUiCheckbox
                        isSelected={value}
                        onChange={onChange}
                        size="sm"
                        classNames={{ wrapper: "m-0" }}
                      />
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 📧 Mail Column */}
      {hasMailOption && (
        <div className="bg-primary-color-P11 p-[6px] pb-[24px] rounded-[22px]">
          <InputBGWrapperIcon className="p-[14px] rounded-[16px] flex items-center justify-center">
            <MailIcon fillcolor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>

          <div className="flex flex-col items-center justify-center mt-[16px]">
            {items.map((item) => {
              const fieldName = `notifications.${notificationKey}_${item.replace(/\s+/g, "")}_mail`;

              return (
                <div key={fieldName} className="h-[32px] flex items-center justify-center">
                  <Controller
                    name={fieldName}
                    control={control}
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => (
                      <CustomNextUiCheckbox
                        isSelected={value}
                        onChange={onChange}
                        size="sm"
                        classNames={{ wrapper: "m-0" }}
                      />
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🧩 Right side - Title & Items */}
      <div className="flex-1 pt-[6px] space-y-[20px]">
        <IconHeader icon={icon} title={title} description={description} />

        <ul>
          {items.map((item) => (
            <li key={item} className="ST-4 text-primary-color-P1 h-[32px] flex items-center">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default NotificationItem;
