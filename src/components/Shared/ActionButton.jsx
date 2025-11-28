import InputLeftStickStatus from "./InputLeftStickStatus";

// Icons
import { PlayIcon } from "../Icons";

const ActionButton = ({
  IconComponent,
  iconFillColor = "fill-primary-color-P1",
  label,
  onClick,
  inputBarStatusClassName,
  className = "",
}) => {
  return (
    <InputLeftStickStatus inputBarStatusClassName={inputBarStatusClassName}>
      <button
        type="button"
        onClick={onClick}
        className={`w-full bg-primary-color-P1 p-[6px] rounded-[16px] flex items-center ${className}`}
      >
        <div className="bg-primary-color-P12 rounded-[10px] p-[8px]">
          <IconComponent fillcolor={iconFillColor} />
        </div>
        <div className="flex items-center ml-[16px]">
          <span className="ST-3 text-primary-color-P12">{label}</span>
        </div>
        <div className="bg-primary-color-P12 rounded-[10px] p-[8px] ml-auto">
          <PlayIcon fillcolor={"fill-primary-color-P1"} />
        </div>
      </button>
    </InputLeftStickStatus>
  );
};

export default ActionButton;
