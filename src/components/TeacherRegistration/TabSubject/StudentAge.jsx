import { CheckIcon, CloseBoxIcon, UserLuggageIcon } from "../../Icons";
import SectionHeader from "../../Globals/SectionHeader";
import { Switch } from "@nextui-org/react";

import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";

const StudentAge = ({
  setTeachToAmateurPersons,
  setTeachToYoungPersons,
  teachToAmateurPersons,
  teachToYoungPersons,
  errors,
}) => {
  return (
    <div className="md:px-8 mt-[50px]">
      <SectionHeader
        wrapperSectionHeaderClassName={"pb-[30px]"}
        descriptionText="iPractis considers all students aged between 5 and 14 as young students. By activating this option, you agree to teach this age group."
        titleIcon={<UserLuggageIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Student's age"
        titleClassName="MT-SB-1"
      />

      <Switch
        name="teachToYoungPersons"
        checked={teachToYoungPersons}
        onChange={(e) => setTeachToYoungPersons(e.target.checked)}
        size="sm"
        classNames={{
          base: "mb-2.5 block",
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

      <ErrorZodResponse errors={errors} fieldName={"teachToYoungPersons"} />

      <Switch
        name="teachToAmateurPersons"
        checked={teachToAmateurPersons}
        onChange={(e) => setTeachToAmateurPersons(e.target.checked)}
        size="sm"
        classNames={{
          base: "mt-2.5",
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

      <ErrorZodResponse errors={errors} fieldName={"teachToAmateurPersons"} />
    </div>
  );
};

export default StudentAge;
