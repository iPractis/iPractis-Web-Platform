// Icons
import { QuestionMark } from "../../Icons";

const InfoCard = ({
  togglePosition = "right",
  icon: IconComponent,
  isActive = true,
  description,
  title,
  status,
}) => {
  return (
    <div className="bg-primary-color-P11 p-8 rounded-[32px] flex flex-col justify-center items-center text-center">
      {IconComponent && <IconComponent fillColor={"fill-primary-color-P1"} />}

      <div className="mt-4">
        <h3 className="text-primary-color-P1 MT-SB-1 flex gap-1.5 items-center justify-center">
          {title} <QuestionMark fillColor={"fill-primary-color-P1"} />
        </h3>

        <h5 className="text-primary-color-P4 space-x-1.5 mt-0.5">
          {togglePosition === "right" ? (
            <>
              <span className="ST-4">{description}</span>
              <span className="bg-tertiary-color-SC5 text-primary-color-P12 ST-SB-3 px-2 py-0.5 rounded-lg">
                {isActive ? status || "On" : "Off"}
              </span>
            </>
          ) : (
            <>
              <span className="bg-tertiary-color-SC5 text-primary-color-P12 ST-SB-3 px-2 py-0.5 rounded-lg">
                {isActive ? status || "On" : "Off"}
              </span>
              <span className="ST-4">{description}</span>
            </>
          )}
        </h5>
      </div>
    </div>
  );
};

export default InfoCard;
