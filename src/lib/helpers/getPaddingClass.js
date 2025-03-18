export const getPaddingClass = (inputValue) => {
  if (inputValue.startsWith("D") || inputValue.startsWith("S")) {
    return "lg:!ps-[2.5rem]";
  }

  if (inputValue.startsWith("Au")) return "lg:!ps-[3.2rem]";

  if (inputValue.startsWith("A")) return "lg:!ps-[3.5rem]";

  if (inputValue.startsWith("May")) return "lg:!ps-[3.6rem]";

  if (inputValue.startsWith("M")) return "lg:!ps-[3.3rem]";

  if (inputValue.startsWith("Jul")) return "lg:!ps-[3.8rem]";

  if (inputValue.startsWith("Ju")) return "lg:!ps-[3.6rem]";

  if (inputValue.startsWith("N")) return "lg:!ps-[2.7rem]";

  return "lg:!ps-[3rem]";
};
