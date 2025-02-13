import { twMerge } from "tailwind-merge";

const SectionHeader = ({
  titleClassName = "MT-SB-2",
  descriptionClassName = "mt-1.5",
  wrapperSectionHeaderClassName = "",
  headerContainerClassName = "",
  descriptionText,
  titleText,
  titleIcon,
  children,
}) => (
  <>
    <div className={wrapperSectionHeaderClassName}>
      <div className={headerContainerClassName}>
        <h3
          className={twMerge(
            "flex gap-2.5 text-primary-color-P1 items-center",
            titleClassName
          )}
        >
          {titleIcon}
          {titleText}
        </h3>

        <p
          className={twMerge(
            "ST-3 text-primary-color-P4",
            descriptionClassName
          )}
        >
          {descriptionText}
        </p>
      </div>

      {children}
    </div>
  </>
);

export default SectionHeader;
