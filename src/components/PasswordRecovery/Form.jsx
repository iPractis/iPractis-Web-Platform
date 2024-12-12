import CustomNextUiInput from "../Globals/CustomNextUiInput";
import { EmailBGIcon } from "../Icons";

const Form = () => {
  return (
    <form>
      <div className="my-[50px]">
        <CustomNextUiInput
          type="email"
          placeholder="Enter your email address"
          startContent={<EmailBGIcon fillColor={"fill-primary-color-P4"} />}
        />
      </div>

      <button
        className="btn btn-secondary w-full py-3 px-4 rounded-2xl MT-SB-1"
        type="submit"
      >
        Send me an email
      </button>
    </form>
  );
};

export default Form;
