import BottomColumn from "./BottomColumn";
import TopColumn from "./TopColumn";

export const Register = () => {
  return (
    <section className="container-page-v3">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Create an account if the user doesn't have one */}
        <TopColumn />

        {/* Login if user have an account */}
        <BottomColumn />
      </div>
    </section>
  );
};