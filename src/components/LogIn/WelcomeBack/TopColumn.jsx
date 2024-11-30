import SectionHeader from "../../Globals/SectionHeader";
import Image from "next/image";

// Images && icons
import microsoft from "@/public/icons/microsoft-original.png";
import qrCodeUser from "@/public/icons/qr-code-user.png";
import lockedUser from "@/public/icons/locked-user.png";
import google from "@/public/icons/google-original.png";
import sparkle from "@/public/icons/sparkle.png";
import qrCode from "@/public/icons/qr-code.png";
import apple from "@/public/icons/apple.png";

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

            <div className="space-y-8">
              <div className="flex gap-3 mt-[50px]">
                <button
                  className="btn w-full py-3 px-4 bg-primary-color-P11 rounded-2xl"
                  type="button"
                >
                  <Image
                    alt="Google Original Icon"
                    className="mx-auto w-[22px] h-[22px] object-contain"
                    src={google}
                  />
                </button>

                <button
                  className="btn w-full py-3 px-4 bg-primary-color-P11 rounded-2xl"
                  type="button"
                >
                  <Image
                    alt="Microsoft Original Icon"
                    className="mx-auto w-[22px] h-[22px] object-contain"
                    src={microsoft}
                  />
                </button>

                <button
                  className="btn w-full py-3 px-4 bg-primary-color-P11 rounded-2xl"
                  type="button"
                >
                  <Image
                    alt="Apple Original Icon"
                    className="mx-auto w-[22px] h-[22px] object-contain"
                    src={apple}
                  />
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
              >
                Log in
              </button>

              <p className="text-primary-color-P4 text-center ST-4">
                I can’t sing in, help!
              </p>
            </div>
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
