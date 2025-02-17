import SectionHeader from "../../Shared/SectionHeader";

// Images && icons
import {
  CheckedShieldBigIcon,
  CheckedShieldIcon,
  QuestionMark,
} from "../../Icons";

const SecurityCheckUp = () => {
  return (
    <>
      <SectionHeader
        descriptionText={
          "Review and monitor your account's security status to stay protected and informed of any recent activity."
        }
        wrapperSectionHeaderClassName="px-4"
        titleIcon={<CheckedShieldIcon fillColor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px]"}
        titleClassName="MT-SB-1"
        titleText={"Security Check-Up"}
      />

      <div className="grid grid-cols-3 gap-8">
        <div className="bg-primary-color-P11 p-8 rounded-[32px] flex flex-col justify-center items-center text-center">
          <CheckedShieldBigIcon fillColor={"fill-primary-color-P1"} />

          <div className="mt-4">
            <h3 className="text-primary-color-P1 MT-SB-1 flex gap-1.5 items-center">
              Sign-in and recovery <QuestionMark fillColor={'fill-primary-color-P1'} />
            </h3>

            <h5 className="text-primary-color-P4 ST-4 mt-0.5">Multi-Step verification <span className="bg-tertiary-color-SC5 text-primary-color-P12 px-2 py-0.5 rounded-lg">On</span></h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityCheckUp;
