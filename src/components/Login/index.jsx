import BottomColumn from "./BottomColumn";
import TopColumn from "./TopColumn";

export const Login = () => {
  return (
    <section className="container-page-v2">
      <div className="mt-2.5 p-4 md:mb-[100px] rounded-[32px] bg-primary-color-P11">
        {/* Login if there's an account */}
        <TopColumn />

        {/* Register if user doesn't have an account */}
        <BottomColumn />
      </div>
    </section>
  );
};
