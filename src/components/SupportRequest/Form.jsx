import DualButton from "../Globals/DualButton";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";

const Form = () => {
  return (
    <form className="bg-primary-color-P12 p-8 mt-8 rounded-2xl">
      <div className="flex flex-col md:flex-row sm:gap-[50px]">
        <LeftColumn />

        <RightColumn />
      </div>

      <DualButton leftButtonText={"Cancel"} rightButtonText={"Send"} />
    </form>
  );
};

export default Form;
