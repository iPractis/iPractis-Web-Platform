const getSecurityLevelMessage = (level) => {
  switch (level) {
    case 1:
      return "Very weak";
    case 2:
      return "Weak";
    case 3:
      return "Fair";
    case 4:
      return "Strong";
    default:
      return "";
  }
};

export default getSecurityLevelMessage;
