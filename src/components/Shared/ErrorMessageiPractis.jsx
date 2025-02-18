import {
  findInputErrorZod,
  findInputMultipleErrorZod,
  getTitleAndDescZod,
} from "@/src/lib/utils/getZodValidations";

import InputLeftStickStatus from "./InputLeftStickStatus";
import InputBGWrapperIcon from "./InputBGWrapperIcon";
import { WarningTriangleIcon } from "../Icons";

const ErrorMessageiPractis = ({ typeError, descError }) => {
  return (
    <InputLeftStickStatus inputBarStatusClassName={"bg-septenary-color-MA5 h-8"}>
      <div className="flex items-start gap-4 p-4 rounded-2xl mt-2 bg-quaternary-color-A8">
        <InputBGWrapperIcon className={"bg-quaternary-color-A12"}>
          <WarningTriangleIcon fillColor={"fill-quaternary-color-A1"} />
        </InputBGWrapperIcon>

        <div>
          <h4 className="text-primary-color-P1 ST-SB-3">{typeError}</h4>
          <h5 className="text-quaternary-color-A1 ST-1">{descError}</h5>
        </div>
      </div>
    </InputLeftStickStatus>
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

export const ErrorMultipleZodResponse = ({ errors, fieldName }) =>
  findInputMultipleErrorZod(errors, fieldName) && (
    <ErrorMessageiPractis
      descError={
        getTitleAndDescZod(
          findInputMultipleErrorZod(errors, fieldName)?.message
        )?.desc
      }
      typeError={
        getTitleAndDescZod(
          findInputMultipleErrorZod(errors, fieldName)?.message
        )?.title
      }
    />
  );
