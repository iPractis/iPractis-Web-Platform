import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import ActionButton from "../../Shared/ActionButton";
import SectionContent from "../../Shared/SectionContent";

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
      <ActionButton
        IconComponent={PasswordDotsDashIcon}
        label="Edit password"
        inputBarStatusClassName={getInputStatusBorder(errors, userEmail, "email")}
        onClick={() => {}}
      />
    </SectionContent>
  );
};

export default LogInID;
