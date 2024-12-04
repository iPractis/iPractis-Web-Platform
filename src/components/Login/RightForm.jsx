import Image from "next/image";

import qrCode from "@/public/icons/qr-code.png";

const RightForm = () => {
  return (
    <div className="flex gap-4 mt-[50px]">
      <div className="flex-1 bg-primary-color-P11 rounded-2xl p-4">
        <Image alt="QR Code" className="w-full" src={qrCode} />
      </div>

      <div className="flex-1 py-4">
        <p className="text-primary-color-P4 ST-3">
          Use the iPractis Mobile App sign in via QR code
        </p>
      </div>
    </div>
  );
};

export default RightForm;
