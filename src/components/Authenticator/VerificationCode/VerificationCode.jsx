import SectionHeader from "../../Globals/SectionHeader";
import Form from "./Form";

// Icons && images
import sparkle from "@/public/icons/sparkle.png";

const VerificationCode = () => {
  return (
    <section className="container-page-v3">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        <article>
          <div className="p-4">
            {/* Heading Title */}
            <SectionHeader
              descriptionText="Sign in to continue your journey with iPractis."
              titleClassName="MT-SB-1"
              titleText="Welcome back"
              iconClassName="w-[20px]"
              iconAlt={"Sparkle Icon"}
              iconSrc={sparkle}
            />
          </div>

          {/* Login with verification code */}
          <Form />
        </article>
      </div>
    </section>
  );
};

export default VerificationCode;
