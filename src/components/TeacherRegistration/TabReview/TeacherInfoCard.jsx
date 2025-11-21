import { CalendarIcon, CheckedShieldIcon } from "../../Icons";

const TeacherInfoCard = ({
  draftData,
  icon: IconComponent,
  title,
  description,
  dataKey,
  fallbackText
}) => {
  const dataList = draftData?.[dataKey] || [];

  return (
    <article className="my-[32px]">
      {/* Header */}
      <div className="bg-primary-color-P12 rounded-[32px] p-4 mb-8 h-[48px] flex items-center gap-[10px] max-w-none w-[calc(100%+160px)] md:w-[calc(100%+120px)] sm:w-[calc(100%+48px)] ml-[-80px] md:ml-[-50px] sm:ml-[-20px]">
        {/* Icon container */}
        <div className="ml-[-36px] md:ml-[-24px] sm:ml-[-12px] w-[48px] h-[48px] rounded-[16px] bg-secondary-color-S11 flex items-center justify-center p-[14px]">
          <IconComponent fillcolor={"fill-primary-color-P1"} />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="MT-SB-1 text-primary-color-P1">{title}</h3>
          <p className="ST-3 text-primary-color-P4">{description}</p>
        </div>
      </div>

      {dataList.length > 0 && dataList.map((data, idx) => (
        <div key={idx} className="flex flex-col items-start p-8 gap-4 w-full max-w-[1000px] h-[179px] bg-secondary-color-S11 rounded-[32px] flex-none order-1 self-stretch grow-0">
          {/* Title/Date container */}
          <div className="flex flex-row items-start p-0 gap-4 w-[936px] h-[48px] flex-none order-0 self-stretch grow-0">
            {/* Title frame */}
            <div className="flex flex-row items-center p-[14px_16px] gap-2.5 w-[679px] h-[48px] bg-primary-color-P12 rounded-[16px] flex-none order-0 grow-1">
              <h3 className="w-[239px] h-[20px] ST-SB-3 text-primary-color-P1 whitespace-nowrap overflow-hidden text-ellipsis flex-none order-0 grow-0">
                {data.company || fallbackText}
              </h3>
            </div>

            {/* Date and validation container */}
            <div className="flex flex-row justify-center items-center gap-2.5 w-[162px] h-[48px] bg-primary-color-P12 rounded-[16px] flex-none order-1 grow-0">
              {/* Calendar icon */}
              <span className="flex flex-row items-center p-2 gap-2.5 w-[36px] h-[36px] bg-secondary-color-S11 opacity-80 rounded-[10px] flex-none order-0 grow-0">
                <CalendarIcon fillcolor={"fill-primary-color-P1"} />
              </span>
              <p className="h-[20px] ST-2 pr-[4px] text-primary-color-P1">From {data.from} to {data.to}</p>
            </div>

            {/* Valid icon */}
            <span className="flex flex-row items-center p-3 gap-2.5 w-[48px] h-[48px] bg-primary-color-P12 rounded-[16px] flex-none order-2 grow-0">
              <CheckedShieldIcon fillcolor={"fill-primary-color-P1"} />
            </span>
          </div>

          {/* Description frame */}
          <div className="flex flex-row justify-center items-center p-0 px-4 gap-2.5 w-[936px] h-[51px] flex-none order-1 self-stretch grow-0">
            <p className="w-[904px] h-[51px] ST-2 text-primary-color-P4 flex-none order-0 grow-1">
              {data.description}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default TeacherInfoCard;