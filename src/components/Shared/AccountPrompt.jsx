import SectionHeader from "./SectionHeader";
import Link from "next/link";

const AccountPrompt = ({
  headerContainerClassName,
  linkButtonStyles,
  additionalText,
  descText,
  hrefLink,
  textLink,
  btnColor,
  titleIcon,
  titleText,
}) => {
  return (
    <div className="bg-primary-color-P12 sm:px-8 sm:mt-[50px] mt-8 rounded-2xl">
      <div className={"flex flex-col items-stretch gap-8"}>
        <div className="flex-1">
          <SectionHeader
            headerContainerClassName={headerContainerClassName}
            descriptionClassName="mt-1"
            descriptionText={descText}
            titleClassName="MT-SB-1"
            titleIcon={titleIcon}
            titleText={titleText}
          />
        </div>

        <div className="flex-1">
          <Link
            className={`btn ${btnColor} w-full MT-SB-1 rounded-2xl py-3 px-4 ${linkButtonStyles}`}
            href={hrefLink}
          >
            {textLink}
          </Link>

          {additionalText}
        </div>
      </div>
    </div>
  );
};

export default AccountPrompt;
