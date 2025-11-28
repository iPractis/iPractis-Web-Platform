import { ChevronDownMediumPlusIcon, LinkHorizontalMediumPlusIcon } from "../Icons";

const SocialConnectButton = ({
  isConnected = false,
  IconComponent,
  label,
  onClick,
  disabled
}) => {
  return (
    <div className="flex justify-between items-center rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="bg-secondary-color-S11 p-[12px] rounded-[16px] gap-[10px]">
          <IconComponent />
        </div>

        <h3 className="text-primary-color-P4 ST-3">{label}</h3>
      </div>

      <div className="">
        <button
          className={`${
            isConnected ? "bg-quinary-color-VS11" : "bg-secondary-color-S11 hover:bg-secondary-color-S8"
          } p-[6px] flex items-center justify-between rounded-[16px] pl-[16px] ST-3 w-[160px] transition-colors duration-200`}
          onClick={onClick}
          type="button"
          disabled={disabled}
        >
          <span>{isConnected ? "Connected" : "Connect"}</span>
          <div className="bg-primary-color-P12 p-[8px] rounded-[10px]">
            {
              isConnected ? (
                <LinkHorizontalMediumPlusIcon fillcolor="fill-primary-color-P1" />
              ): (
                <ChevronDownMediumPlusIcon fillcolor="fill-primary-color-P1" />
              )
            }
          </div>
        </button>
      </div>
    </div>
  );
};

export default SocialConnectButton;
