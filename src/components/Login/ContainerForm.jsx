import SectionHeader from "../Globals/SectionHeader";
import LeftForm from "./LeftForm";

// Images && icons
import qrCodeUser from "@/public/icons/qr-code-user.png";
import lockedUser from "@/public/icons/locked-user.png";
import sparkle from "@/public/icons/sparkle.png";
import RightForm from "./RightForm";

const ContainerForm = () => {
  return (
    <form>
      {/* Heading Title */}
      <div className="p-4">
        <SectionHeader
          descriptionText="Sign in to continue your journey with iPractis."
          titleClassName="MT-SB-1"
          titleText="Welcome back"
          iconClassName="w-[20px]"
          iconAlt={"Sparkle Icon"}
          iconSrc={sparkle}
        />
      </div>

      {/* Log In Section */}
      <div className="bg-primary-color-P12 p-8 mt-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start sm:gap-[50px]">
          <div className="flex-1 w-full">
            <SectionHeader
              descriptionText="Enter your account details to access to your account."
              iconAlt={"Locked User Icon"}
              descriptionClassName="mt-1"
              iconClassName="w-[19px]"
              titleClassName="MT-SB-1"
              iconSrc={lockedUser}
              titleText="Log in"
            />

            <LeftForm />
          </div>

          <div className="md:block hidden flex-1 w-full">
            <SectionHeader
              descriptionText="Log in with a QR code or a sign-in code."
              titleText="Alternative Login Methods"
              iconAlt={"QR Code User Icon"}
              descriptionClassName="mt-1"
              titleClassName="MT-SB-1"
              iconSrc={qrCodeUser}
              iconClassName="w-6"
            />

            <RightForm />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContainerForm;
