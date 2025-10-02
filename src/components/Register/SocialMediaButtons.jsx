// React imports
import Image from "next/image";

// Images
import microsoft from "@/public/icons/microsoft-original.png";
import google from "@/public/icons/google-original.png";
import apple from "@/public/icons/apple.png";

const SocialMediaButtons = () => {
  return (
    <div className="flex gap-3 mt-8 -ml-1.5">
      <button
        className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
        type="button"
      >
        <Image
          alt="Google Original Icon"
          className="mx-auto w-[22px] h-[22px] object-contain"
          src={google}
        />
      </button>

      <button
        className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
        type="button"
      >
        <Image
          alt="Microsoft Original Icon"
          className="mx-auto w-[22px] h-[22px] object-contain"
          src={microsoft}
        />
      </button>

      <button
        className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
        type="button"
      >
        <Image
          alt="Apple Original Icon"
          className="mx-auto w-[22px] h-[22px] object-contain"
          src={apple}
        />
      </button>
    </div>
  );
};

export default SocialMediaButtons;
