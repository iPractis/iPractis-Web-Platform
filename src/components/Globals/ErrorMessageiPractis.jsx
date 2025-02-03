import { findInputErrorZod, getTitleAndDescZod } from "@/src/lib/utils/getZodValidations";
import warningTriangle from "@/public/icons/warning-triangle.png";
import Image from "next/image";

const ErrorMessageiPractis = ({ typeError, descError }) => {
  return (
    <div className="flex items-start gap-2.5 p-1.5 rounded-2xl mt-2 bg-quaternary-color-A8">
      <Image
        className="w-9 h-9"
        src={warningTriangle}
        alt="Warning Icon Triangle"
      />

      <div>
        <h4 className="text-primary-color-P1 ST-SB-3">{typeError}</h4>
        <h5 className="text-primary-color-P4 ST-3">{descError}</h5>
      </div>
    </div>
  );
};

export default ErrorMessageiPractis;

export const ErrorZodResponse = ({ errors, fieldName }) =>
  findInputErrorZod(errors, fieldName) && (
    <ErrorMessageiPractis
      descError={
        getTitleAndDescZod(findInputErrorZod(errors, fieldName)?.message)?.desc
      }
      typeError={
        getTitleAndDescZod(findInputErrorZod(errors, fieldName)?.message)?.title
      }
    />
  );
