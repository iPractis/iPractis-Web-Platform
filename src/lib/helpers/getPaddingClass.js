export const getPaddingClass = (inputValue) => {
  if (inputValue.startsWith("D") || inputValue.startsWith("S")) {
    return "!ps-[2.5rem]";
  }

  if (inputValue.startsWith("Au")) return "!ps-[3.2rem]";

  if (inputValue.startsWith("A")) return "!ps-[3.5rem]";

  if (inputValue.startsWith("May")) return "!ps-[3.6rem]";

  if (inputValue.startsWith("M")) return "!ps-[3.3rem]";

  if (inputValue.startsWith("Jul")) return "!ps-[3.8rem]";

  if (inputValue.startsWith("Ju")) return "!ps-[3.6rem]";

  if (inputValue.startsWith("N")) return "!ps-[2.7rem]";

  return "!ps-[3rem]";
};
