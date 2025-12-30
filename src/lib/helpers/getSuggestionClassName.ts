export const getSuggestionClassName = (month) => {
  if (month.startsWith("Jul")) {
    return "right-[42.5%]";
  }

  if (month.startsWith("Ju")) {
    return "right-[41%]";
  }

  if (month.startsWith("J")) {
    return "right-[32.5%]";
  }

  if (month.startsWith("F")) {
    return "right-[30%]";
  }

  if (month.startsWith("M")) {
    return "right-[38%]";
  }

  if (month.startsWith("Au")) {
    return "right-[35%]";
  }

  if (month.startsWith("A")) {
    return "right-[44%]";
  }

  if (month.startsWith("S")) {
    return "right-[25.5%]";
  }

  if (month.startsWith("O")) {
    return "right-[33%]";
  }

  if (month.startsWith("N")) {
    return "right-[26%]";
  }

  if (month.startsWith("D")) {
    return "right-[28.5%]";
  }
  
  return "";
};
