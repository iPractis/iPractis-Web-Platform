// React imports
import { signIn } from "next-auth/react";
import Image from "next/image";

// Images
import microsoft from "@/public/icons/microsoft-original.png";
import google from "@/public/icons/google-original.png";
import apple from "@/public/icons/apple.png";

const SocialMediaButtons = () => {
  return (
    <div className="flex w-full gap-[12px]">
      <button
        className="flex-1 py-3 px-4 bg-secondary-color-S11 hover:bg-secondary-color-S8 rounded-[16px] transition-colors overflow-hidden"
        onClick={() => signIn("google", { redirect: false })}
        type="button"
      >
        <Image
          alt="Google Original Icon"
          className="mx-auto object-contain"
          src={google}
          width={22}
          height={22}
        />
      </button>

      <button
        className="flex-1 py-3 px-4 bg-secondary-color-S11 hover:bg-secondary-color-S8 rounded-[16px] transition-colors overflow-hidden"
        type="button"
      >
        <Image
          alt="Microsoft Original Icon"
          className="mx-auto object-contain"
          src={microsoft}
          width={22}
          height={22}
        />
      </button>

      <button
        className="flex-1 py-3 px-4 bg-secondary-color-S11 hover:bg-secondary-color-S8 rounded-[16px] transition-colors overflow-hidden"
        type="button"
      >
        <Image
          alt="Apple Original Icon"
          className="mx-auto object-contain"
          src={apple}
          width={22}
          height={22}
        />
      </button>
    </div>
  );
};

export default SocialMediaButtons;
