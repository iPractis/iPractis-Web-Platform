export const maskEmail = (email) => {
  if (!email) return "";

  const [username, domain] = email.split("@");
  const [domainName, domainExt] = domain.split(".");

  // Format the username part
  const formattedUsername =
    username.length > 2
      ? `${username[0]}${"*".repeat(username.length - 2)}${
          username[username.length - 1]
        }`
      : username;

  // Format the domain part
  const formattedDomain =
    domainName.length > 2
      ? `${domainName[0]}${"*".repeat(domainName.length - 2)}${
          domainName[domainName.length - 1]
        }`
      : domainName;

  return `${formattedUsername}@${formattedDomain}.${domainExt}`;
};
