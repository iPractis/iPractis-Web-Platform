import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

const SocialConnectButton = ({
  isConnected = false,
  IconComponent,
  label,
  onClick,
}) => {
  return (
    <div className="bg-primary-color-P11 flex justify-between items-center gap-4 p-1.5 rounded-2xl">
      <div className="flex-[28%] flex items-center gap-4">
        <InputBGWrapperIcon>
          <IconComponent />
        </InputBGWrapperIcon>

        <h3 className="text-primary-color-P4 MT-1">{label}</h3>
      </div>

      <div className="flex-1">
        <button
          className={`${
            isConnected ? "bg-quinary-color-VS8" : "bg-primary-color-P12"
          } btn w-full px-7 py-1.5 rounded-[10px]`}
          onClick={onClick}
          type="button"
        >
          {isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default SocialConnectButton;
