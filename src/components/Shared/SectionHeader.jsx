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
        <div className="flex gap-2.5 items-center">
          {titleIcon}
          <div className="flex flex-col">
            <h3
              className={twMerge(
                "text-primary-color-P1",
                titleClassName
              )}
            >
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
        </div>
      </div>

      {children}
    </div>
  </>
);

export default SectionHeader;
