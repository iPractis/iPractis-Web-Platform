import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Icons && images
import { QuestionMark, TownhallIcon, WalletIcon } from "../../Icons";
import paypalLogo from "@/public/logos/paypal-logo-1.png";
import wiseLogo from "@/public/logos/wise-logo-1.png";

const Withdrawal = () => {
  return (
    <div className="flex-1">
      <SectionHeader
        descriptionText="You have the freedom to establish a rate that aligns with your professional standards."
        titleIcon={<WalletIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Withdrawal"
        titleClassName="MT-SB-1"
      />

      <div className="flex gap-5 mt-8 mb-14">
        <div className="btn-septenary p-4 cursor-pointer rounded-2xl flex-1">
          <Image className="w-[66px] mx-auto" src={wiseLogo} alt="Logo Wise" />{" "}
        </div>

        <div className="btn-septenary p-4 cursor-pointer rounded-2xl flex-1">
          <Image
            className="w-[66px] mx-auto"
            src={paypalLogo}
            alt="Logo Paypal"
          />{" "}
        </div>
      </div>

      <div className="flex items-end gap-2 mt-7">
        <CustomNextUiInput
          type="text"
          name="widthdrawalEmailAddress"
          placeholder="Email address"
          classNames={{
            label: "!-top-11",
          }}
          label={
            <div className="flex flex-col">
              <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                Withdrawal your revenue
                <QuestionMark fillColor={"fill-primary-color-P4"} />
              </span>

              <div className="self-start">
                <span className=" text-primary-color-P4 ST-3">
                  Enter the email address related to your bank account
                </span>
              </div>
            </div>
          }
          labelPlacement="outside"
          startContent={
            <InputBGWrapperIcon>
              <TownhallIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
        />
      </div>
    </div>
  );
};

export default Withdrawal;
