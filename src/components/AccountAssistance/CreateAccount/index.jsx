import BottomColumn from "./BottomColumn";
import TopColumn from "./TopColumn";

const AccountSupportService = () => {
  return (
    <section className="container-page-v3">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Create an account if the user doesn't have one */}
        <TopColumn />

        {/* Account Assistance */}
        <BottomColumn />
      </div>
    </section>
  );
};

export default AccountSupportService;
