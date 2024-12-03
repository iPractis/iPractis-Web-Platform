import Image from "next/image";

const SectionHeader = ({
  iconClassName = "w-[22px]",
  titleClassName = "MT-SB-2",
  descriptionClassName = "mt-1.5",
  wrapperSectionHeaderClassName = "",
  descriptionText,
  theme = "white",
  titleText,
  iconAlt,
  iconSrc,
}) =>
  theme === "white" ? (
    <div className={wrapperSectionHeaderClassName}>
      <h3
        className={`flex gap-2.5 text-primary-color-P1 items-center ${titleClassName}`}
      >
        <Image className={iconClassName} alt={iconAlt} src={iconSrc} />
        {titleText}
      </h3>

      <p className={`ST-3 text-primary-color-P4 ${descriptionClassName}`}>
        {descriptionText}
      </p>
    </div>
  ) : (
    <div className={`${wrapperSectionHeaderClassName} text-primary-color-P12`}>
      <h3 className="flex gap-2.5 items-center MT-SB-2">
        <Image className={iconClassName} alt={iconAlt} src={iconSrc} />
        {titleText}
      </h3>

      <p className={`ST-3 ${descriptionClassName}`}>{descriptionText}</p>
    </div>
  );

export default SectionHeader;
