export const getSuggestionClassName = (month) => {
  if (month.startsWith("Jul")) {
    return "left-[59%] -translate-x-1/2";
  }

  if (month.startsWith("Ju")) {
    return "left-[60.8%] -translate-x-1/2";
  }

  if (month.startsWith("J")) {
    return "left-[68%] -translate-x-1/2";
  }

  if (month.startsWith("F")) {
    return "left-[69.5%] -translate-x-1/2";
  }

  if (month.startsWith("M")) {
    return "left-[64%] -translate-x-1/2";
  }

  if (month.startsWith("Au")) {
    return "left-[65.5%] -translate-x-1/2";
  }

  if (month.startsWith("A")) {
    return "left-[60%] -translate-x-1/2";
  }

  if (month.startsWith("S")) {
    return "left-[74%] -translate-x-1/2";
  }

  if (month.startsWith("O")) {
    return "left-[67.5%] -translate-x-1/2";
  }

  if (month.startsWith("N")) {
    return "left-[72.5%] -translate-x-1/2";
  }

  if (month.startsWith("D")) {
    return "left-[72.6%] -translate-x-1/2";
  }
  return "";
};
