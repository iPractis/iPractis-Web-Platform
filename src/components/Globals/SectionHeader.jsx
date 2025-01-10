import { twMerge } from "tailwind-merge";

const SectionHeader = ({
  titleClassName = "MT-SB-2",
  descriptionClassName = "mt-1.5",
  wrapperSectionHeaderClassName = "",
  descriptionText,
  titleText,
  titleIcon,
  children,
}) => (
  <>
    <div className={wrapperSectionHeaderClassName}>
      <div>
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

      <div>{children}</div>
    </div>
  </>
);

export default SectionHeader;
