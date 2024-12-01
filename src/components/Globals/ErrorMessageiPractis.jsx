import warningTriangle from "@/public/icons/warning-triangle.png";
import Image from "next/image";

const ErrorMessageiPractis = ({ typeError, descError }) => {
  return (
    <div className="flex gap-2.5 items-center p-1.5 rounded-2xl mt-2 bg-quaternary-color-A8">
      <div>
        <Image
          className="w-9"
          src={warningTriangle}
          alt="Warning Icon Triangle"
        />
      </div>

      <div>
        <h4 className="text-primary-color-P1 ST-SB-3">{typeError}</h4>
        <h5 className="text-primary-color-P4 ST-3">{descError}</h5>
      </div>
    </div>
  );
};

export default ErrorMessageiPractis;
