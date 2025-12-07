import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import ActionButton from "../../Shared/ActionButton";
import SectionContent from "../../Shared/SectionContent";
import Link from "next/link";

// Icons
import { MailSmallIcon, PasswordDotsDashIcon } from "../../Icons";

const LogInID = ({ errors, userEmail }) => {
  return (
    <SectionContent>
      <ActionButton
        IconComponent={MailSmallIcon}
        label="Edit email"
        inputBarStatusClassName={getInputStatusBorder(errors, userEmail, "email")}
        onClick={() => {}}
      />
      <Link href="/password-recovery">
        <ActionButton
          IconComponent={PasswordDotsDashIcon}
          label="Edit password"
          inputBarStatusClassName={getInputStatusBorder(errors, userEmail, "email")}
        />
      </Link>
    </SectionContent>
  );
};

export default LogInID;
