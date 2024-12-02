import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Images && icons
import qrCodeUser from "@/public/icons/qr-code-user.png";
import lockedUser from "@/public/icons/locked-user.png";
import sparkle from "@/public/icons/sparkle.png";
import qrCode from "@/public/icons/qr-code.png";
import Form from "./Form";

const TopColumn = () => {
  return (
    <article>
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
        <div className="flex flex-col md:flex-row items-start gap-[50px]">
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

            <Form />
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

            <div className="flex gap-4 mt-[50px]">
              <div className="flex-1 bg-primary-color-P11 rounded-2xl p-4">
                <Image alt="QR Code" className="w-full" src={qrCode} />
              </div>

              <div className="flex-1 py-4">
                <p className="text-primary-color-P4 ST-3">
                  Use the iPractis Mobile App sign in via QR code
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopColumn;
