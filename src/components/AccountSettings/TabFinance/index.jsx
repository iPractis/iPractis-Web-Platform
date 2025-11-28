import PaymentMethod from "./PaymentMethod";
import FinancialActivities from "./FinancialActivities";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionHeader from "../../Shared/SectionHeader";

// Icons
import { CreditCardSmallIcon, CurrencyRefreshIcon } from "../../Icons";

const TabFinance = ({ activeTab }) => {
  return (
    <form className={`${activeTab !== 4 && "hidden"} space-y-[64px]`}>
      {/* Payment Method Section */}
      <SectionWrapper>
        <SectionHeader
          titleIcon={<CreditCardSmallIcon fillcolor="fill-primary-color-P1" />}
          titleText="Payment method"
          descriptionText="Securely manage your payment methods"
          titleClassName="MT-SB-1"
        />
        <PaymentMethod />
      </SectionWrapper>

      {/* Financial Activities Section */}
      <SectionWrapper>
        <SectionHeader
          titleIcon={<CurrencyRefreshIcon fillcolor="fill-primary-color-P1" />}
          titleText="Financial activities"
          descriptionText="Keep track of your transactions."
          titleClassName="MT-SB-1"
        />
        <FinancialActivities />
      </SectionWrapper>
    </form>
  );
};

export default TabFinance;
