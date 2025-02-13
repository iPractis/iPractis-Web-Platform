import SectionHeader from "@/src/components/Shared/SectionHeader";
import { PadLockOpenedIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Your password has been updated. You can now log in with your new password."
        titleText="Password Changed Successfully"
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName={
          "sm:bg-primary-color-P11 rounded-[32px] sm:p-8"
        }
        titleIcon={<PadLockOpenedIcon />}
      />
    </article>
  );
};

export default TopColumn;
