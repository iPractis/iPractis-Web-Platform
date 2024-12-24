import CustomNextUiTextarea from "../Globals/CustomNextUiTextarea";
import SectionHeader from "../Globals/SectionHeader";
import { WrenchIcon } from "../Icons";

const RightColumn = () => {
  return (
    <article className="flex-1 w-full">
      <SectionHeader
        descriptionText="Briefly explain the problem to help us assist you."
        titleText="Describe Your Issue"
        descriptionClassName="mt-1"
        titleIcon={<WrenchIcon />}
        titleClassName="MT-SB-1"
      />

      <div className="my-[50px] w-full">
        <CustomNextUiTextarea
          placeholder="Describe the situation"
          classNames={{ input: "h-[222px]" }}
          size="primaryiPractis"
          disableAutosize
        />
      </div>
    </article>
  );
};

export default RightColumn;
