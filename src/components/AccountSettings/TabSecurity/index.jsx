import MultiStepVerification from "./MultiStepVerification";
import ConnectYourAccount from "./ConnectYourAccount";
import LogInID from "./LogInID";
import Devices from "./Devices";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";

// External imports
import { useAuth } from "@/src/hooks/useAuth";
import { useForm } from "react-hook-form";

// Icons
import {
  LockUserIcon,
  LoginIcon,
  LinkHorizontalMediumPlusIcon,
  EyeSmallIcon,
} from "../../Icons";

const TabSecurity = ({ activeTab }) => {
  const { user } = useAuth();

  const {
    formState: { errors },
    control,
    isSubmitted,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: user?.email,
    },
  });

  return (
    <form className={`${activeTab !== 2 && "hidden"} space-y-[64px]`}>
      <SectionWrapper>
        <SectionHeader
          titleIcon={<LoginIcon fillcolor="fill-primary-color-P1" />}
          titleText="Log in information"
          descriptionText="Manage your account log in information."
          titleClassName="MT-SB-1"
        />
        <SectionContent>
          <LogInID userEmail={user?.email} errors={errors} />
        </SectionContent>
      </SectionWrapper>

      {/* <Password /> */}

      <SectionWrapper>
        <SectionHeader
          titleIcon={<LockUserIcon fillcolor="fill-primary-color-P1" />}
          titleText="Multi-Step authentication"
          descriptionText="Enable multi-step authentication to add layer of security."
          titleClassName="MT-SB-1"
        />
        <SectionContent>
          <MultiStepVerification
            isSubmitted={isSubmitted}
            control={control}
            errors={errors}
          />
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader
          titleIcon={<LinkHorizontalMediumPlusIcon fillcolor="fill-primary-color-P1" />}
          titleText="Federated login"
          descriptionText="Easily link your account using Apple, Google or Microsoft, for a smooth login experience."
          titleClassName="MT-SB-1"
        />
        <SectionContent>
          <ConnectYourAccount />
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader
          titleIcon={<EyeSmallIcon fillcolor="fill-primary-color-P1" />}
          titleText="Logged devices management center"
          descriptionText="Review and manage devices connected to your account"
          titleClassName="MT-SB-1"
        />
        <SectionContent>
          <Devices />
        </SectionContent>
      </SectionWrapper>
    </form>
  );
};

export default TabSecurity;
