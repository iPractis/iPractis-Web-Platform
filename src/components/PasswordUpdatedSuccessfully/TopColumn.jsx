import SectionHeader from "@/src/components/Shared/SectionHeader";
import { LockWithUserIcon } from "../Icons";

const TopColumn = () => {
  return (
    <article>
      {/* Heading Title */}
      <SectionHeader
        descriptionText="Your password has been updated. You can now log in with your new password."
        titleText="Password Changed Successfully"
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName={
          "sm:bg-secondary-color-S11 rounded-[32px] sm:p-8"
        }
        titleIcon={<LockWithUserIcon fillColor="fill-primary-color-P1" />}
      />
    </article>
  );
};

export default TopColumn;
