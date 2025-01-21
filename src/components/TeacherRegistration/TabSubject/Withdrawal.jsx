import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import SectionHeader from "../../Globals/SectionHeader";
import { useState } from "react";
import Image from "next/image";

// Icons && images
import { QuestionMark, TownhallIcon, WalletIcon } from "../../Icons";
import paypalLogo from "@/public/logos/paypal-logo-1.png";
import wiseLogo from "@/public/logos/wise-logo-1.png";

const Withdrawal = ({ draft }) => {
  const [withdrawal, setWithdrawal] = useState(draft?.withdrawal);

  return (
    <div className="md:px-8 mt-[50px]">
      <SectionHeader
        descriptionText="You have the freedom to establish a rate that aligns with your professional standards."
        titleIcon={<WalletIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Withdrawal"
        titleClassName="MT-SB-1"
        wrapperSectionHeaderClassName="mb-[50px]"
      />

      <div className="flex gap-5 mt-8 mb-14">
        <button
          className="w-full"
          type="button"
          onClick={() => setWithdrawal("wise")}
        >
          <div
            className={`p-4 rounded-2xl flex-1 ${
              withdrawal === "wise" ? "bg-quinary-color-SU15" : "btn-septenary"
            }`}
          >
            <Image
              className="w-[66px] mx-auto"
              src={wiseLogo}
              alt="Logo Wise"
            />{" "}
          </div>
        </button>

        <button
          className="w-full"
          type="button"
          onClick={() => setWithdrawal("paypal")}
        >
          <div
            className={`p-4 rounded-2xl flex-1 ${
              withdrawal === "paypal"
                ? "bg-quinary-color-SU15"
                : "btn-septenary"
            }`}
          >
            <Image
              className="w-[66px] mx-auto"
              src={paypalLogo}
              alt="Logo Paypal"
            />{" "}
          </div>
        </button>
      </div>

      <div className="flex items-end gap-2 mt-7">
        <CustomNextUiInput
          defaultValue={draft?.emailWithdrawal}
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
