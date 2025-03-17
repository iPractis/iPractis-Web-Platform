export const getSuggestionClassName = (month) => {
  if (month.startsWith("Jul")) {
    return "right-[71.5%] -translate-x-0";
  }

  if (month.startsWith("Ju")) {
    return "right-[68%] -translate-x-0";
  }

  if (month.startsWith("J")) {
    return "right-[54%] -translate-x-0";
  }

  if (month.startsWith("F")) {
    return "right-[51%] -translate-x-0";
  }

  if (month.startsWith("M")) {
    return "right-[62%] -translate-x-0";
  }

  if (month.startsWith("Au")) {
    return "right-[59%] -translate-x-0";
  }

  if (month.startsWith("A")) {
    return "right-[70%] -translate-x-0";
  }

  if (month.startsWith("S")) {
    return "right-[41.5%] -translate-x-0";
  }

  if (month.startsWith("O")) {
    return "right-[54%] -translate-x-0";
  }

  if (month.startsWith("N")) {
    return "right-[44%] -translate-x-0";
  }

  if (month.startsWith("D")) {
    return "right-[44%] -translate-x-0";
  }
  return "";
};
