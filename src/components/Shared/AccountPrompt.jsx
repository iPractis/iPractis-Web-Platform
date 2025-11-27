import IconHeader from "./IconHeader";
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
    <div className="bg-[#F8F7F5] w-full max-w-[494px] sm:mt-[50px] mt-8 rounded-[32px] p-8 mx-auto">
      <div className={"flex flex-col items-stretch"}>
        <div className="flex-1">
          <IconHeader
            title={titleText}
            description={descText}
            icon={titleIcon}
            className={headerContainerClassName}
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
