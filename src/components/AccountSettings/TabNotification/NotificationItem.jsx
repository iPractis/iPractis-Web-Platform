import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import { MonitorMediumIcon, MailIcon } from "../../Icons";

const NotificationItem = ({
  hasMailOption = true,
  hasWebOption = true,
  description,
  items = [],
  title,
  icon,
}) => {
  return (
    <article className="flex items-start gap-4 lg:px-8">
      {hasWebOption && (
        <div className="bg-primary-color-P11 p-1.5 pb-6 rounded-[22px] space-y-7">
          <InputBGWrapperIcon className={"h-[68px] w-[50px] p-2.5 rounded-2xl"}>
            <div className="flex flex-col items-center text-center p-2.5 gap-1">
              <MonitorMediumIcon fillColor={"fill-primary-color-P1"} />
              <h4 className="ST-3 text-primary-color-P1">Web</h4>
            </div>
          </InputBGWrapperIcon>

          <div className="notifications-checkboxes flex flex-col items-center justify-center gap-8">
            {items.map((item) => (
              <CustomNextUiCheckbox
                className="checkbox-label-ipractis"
                key={item}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      {hasMailOption && (
        <div className="bg-primary-color-P11 p-1.5 pb-6 rounded-[22px] space-y-7">
          <InputBGWrapperIcon className={"h-[68px] w-[50px] p-2.5 rounded-2xl"}>
            <div className="flex flex-col items-center text-center p-2.5 gap-1">
              <MailIcon fillColor={"fill-primary-color-P1"} />
              <h4 className="ST-3 text-primary-color-P1">Mail</h4>
            </div>
          </InputBGWrapperIcon>

          <div className="notifications-checkboxes flex flex-col items-center justify-center gap-8">
            {items.map((item) => (
              <CustomNextUiCheckbox
                className="checkbox-label-ipractis"
                key={item}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      <div className="pt-1.5">
        <SectionHeader
          wrapperSectionHeaderClassName="mb-4 py-2.5"
          descriptionText={description}
          titleIcon={icon}
          descriptionClassName={"mt-[4px]"}
          titleText={title}
          titleClassName="MT-SB-1"
        />

        <ul className="space-y-[10.5px] pb-4">
          {items.map((item, index) => (
            <li key={index} className="ST-4 text-primary-color-P1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default NotificationItem;
