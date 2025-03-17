import SectionHeader from "../../Shared/SectionHeader";
import InfoCard from "./InfoCard";

// Images && icons
import {
  CheckedCloudIcon,
  CheckedShieldBigIcon,
  CheckedShieldIcon,
  MonitorBiggestIcon,
} from "../../Icons";

const SecurityCheckUp = () => {
  return (
    <div>
      <SectionHeader
        descriptionText={
          "Review and monitor your account's security status to stay protected and informed of any recent activity."
        }
        wrapperSectionHeaderClassName="px-4"
        titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px] mb-4"}
        titleText={"Security Check-Up"}
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-3 gap-8">
        <InfoCard
          description="Multi-step verification"
          icon={CheckedShieldBigIcon}
          title="Sign-in and recovery"
          togglePosition="right"
          isActive={true}
          status="On"
        />

        <InfoCard
          icon={MonitorBiggestIcon}
          description="Connected"
          togglePosition="left"
          title="Your devices"
          status="6 Devices"
          isActive={true}
        />

        <InfoCard
          description="Verified until"
          title="Verification Badge"
          icon={CheckedCloudIcon}
          togglePosition="right"
          isActive={true}
          status="2028"
        />
      </div>
    </div>
  );
};

export default SecurityCheckUp;
