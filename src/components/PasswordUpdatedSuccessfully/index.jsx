import BottomColumn from "./BottomColumn";
import TopColumn from "./TopColumn";

export const PasswordUpdatedSuccessfully = () => {
  return (
    <section className="container-page-v4">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Account support service */}
        <TopColumn />

        {/* Password Changed Successfully */}
        <BottomColumn />
      </div>
    </section>
  );
};