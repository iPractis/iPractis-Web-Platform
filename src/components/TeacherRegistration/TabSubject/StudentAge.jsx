import { CheckIcon, CloseBoxIcon } from "../../Icons";
import { Switch } from "@nextui-org/react";

const StudentAge = () => {
  return (
    <>
      <Switch
        size="sm"
        classNames={{
          base: "mb-2.5",
          wrapper:
            "bg-primary-color-P6 group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit",
          thumb: "bg-primary-color-P12",
          label: "text-primary-color-P1 ST-4 ml-1",
        }}
        thumbIcon={({ isSelected }) =>
          isSelected ? (
            <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
          ) : (
            <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
          )
        }
      >
        I accept to teach to young student
      </Switch>

      <Switch
        size="sm"
        classNames={{
          wrapper:
            "bg-primary-color-P6 group-data-[selected=true]:bg-tertiary-color-SC5 p-0.5 w-[36px] h-fit",
          thumb: "bg-primary-color-P12",
          label: "text-primary-color-P1 ST-4 ml-1",
        }}
        thumbIcon={({ isSelected }) =>
          isSelected ? (
            <CheckIcon strokeColor={"stroke-tertiary-color-SC5"} />
          ) : (
            <CloseBoxIcon strokeColor={"stroke-primary-color-P6"} />
          )
        }
      >
        I accept to teach to mature student
      </Switch>
    </>
  );
};

export default StudentAge;
