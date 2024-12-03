import SectionHeader from "./SectionHeader";
import Link from "next/link";

const AccountPrompt = ({
  accountPromptPosition = "horizontal",
  titleText,
  descText,
  iconAlt,
  iconSrc,
  hrefLink,
  textLink,
  btnColor,
}) => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <div
        className={
          accountPromptPosition === "horizontal"
            ? "flex flex-col md:flex-row md:items-center items-stretch md:gap-[50px] gap-8"
            : "flex flex-col md:gap-[50px] gap-8"
        }
      >
        <div className="flex-1">
          <SectionHeader
            descriptionClassName="mt-1"
            descriptionText={descText}
            titleClassName="MT-SB-1"
            iconClassName="w-[24px]"
            titleText={titleText}
            iconAlt={iconAlt}
            iconSrc={iconSrc}
          />
        </div>

        <div className="flex-1">
          <Link
            className={`btn ${btnColor} w-full MT-SB-1 rounded-2xl py-3 px-4`}
            href={hrefLink}
          >
            {textLink}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPrompt;
