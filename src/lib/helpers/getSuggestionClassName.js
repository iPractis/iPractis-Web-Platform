export const getSuggestionClassName = (month) => {
  if (month.startsWith("J")) {
    return "right-[54%] -translate-x-0";
  } else if (month.startsWith("F")) {
    return "right-[51%] -translate-x-0";
  } else if (month.startsWith("A")) {
    return "right-[70%] -translate-x-0";
  } else if (month.startsWith("Au")) {
    return "right-[59%] -translate-x-0";
  } else if (month.startsWith("S")) {
    return "right-[40%] -translate-x-0";
  } else if (month.startsWith("O")) {
    return "right-[54%] -translate-x-0";
  } else if (month.startsWith("N")) {
    return "right-[44%] -translate-x-0";
  } else if (month.startsWith("D")) {
    return "right-[44%] -translate-x-0";
  } else {
    return "";
  }
};
