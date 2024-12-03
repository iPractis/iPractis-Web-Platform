import CustomNextUiInput from "../Globals/CustomNextUiInput";
import Image from "next/image";

// Icons && images
import email from "@/public/icons/email.png";

const Form = () => {
  return (
    <form>
      <div className="my-[50px]">
        <CustomNextUiInput
          color="modern"
          type="email"
          placeholder="Enter your email address"
          startContent={<Image className="w-9" src={email} alt="Email Input" />}
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
