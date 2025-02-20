import BottomColumn from "./BottomColumn";
import TopColumn from "./TopColumn";

export const PasswordUpdatedSuccessfully = () => {
  return (
    <section className="container-page-v8 my-8 sm:px-0 px-8">
      {/* Account support service */}
      <TopColumn />

      {/* Password Changed Successfully */}
      <BottomColumn />
    </section>
  );
};
