import { twMerge } from "tailwind-merge";

interface SectionHeaderProps {
  titleClassName?: string;
  descriptionClassName?: string;
  wrapperSectionHeaderClassName?: string;
  headerContainerClassName?: string;
  descriptionText?: string;
  titleText: string;
  titleIcon?: React.ReactNode;
  titleIconBox?: string;
  rightElement?: React.ReactNode;
  rightElementClassName?: string;
  children?: React.ReactNode;
}

const SectionHeader = ({
  titleClassName,
  descriptionClassName,
  wrapperSectionHeaderClassName,
  headerContainerClassName,
  descriptionText,
  titleText,
  titleIcon,
  titleIconBox,
  rightElement,
  rightElementClassName,
  children,
}: SectionHeaderProps) => (
  <>
    <div className={twMerge("bg-secondary-color-S11 p-[32px] rounded-[32px]",
      wrapperSectionHeaderClassName)}>
      <div className={twMerge("flex justify-between items-center",
        headerContainerClassName)}>
        <div className="flex gap-[16px] items-center">
          <div className={twMerge("bg-primary-color-P12 p-[14px] rounded-[16px]", titleIconBox)}>
            {titleIcon}
          </div>
          <div className="flex flex-col">
            <h3
              className={twMerge(
                "ST-SB-4 text-primary-color-P1",
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
        <div className={twMerge("", rightElementClassName)}>
          {rightElement}
        </div>
      </div>

      {children}
    </div>
  </>
);

export default SectionHeader;
