import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";

const Form = () => {
  return (
    <form className="bg-primary-color-P12 p-8 mt-8 rounded-2xl">
      <div className="flex flex-col md:flex-row items-start sm:gap-[50px]">
        <LeftColumn />

        <RightColumn />
      </div>

      <div className="flex gap-4 items-center">
        <button
          type="button"
          className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4"
        >
          Cancel
        </button>

        <button
          className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
