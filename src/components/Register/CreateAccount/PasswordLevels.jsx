const PasswordLevels = ({ securityLevel }) => {
  const levels = [1, 2, 3, 4];
  const colors = [
    "bg-primary-color-P10", // Without color (gray)
    "bg-septenary-color-MA6", // Level 1 (mistake && alert)
    "bg-senary-color-W6", // Level 2 (warning)
    "bg-quaternary-color-A6", // Level 3 (attention)
    "bg-quinary-color-VS6", // Level 4 (valid && success)
  ];

  return (
    <div className="flex gap-3 px-2.5 mt-2.5">
      {levels.map((level) => (
        <div
          key={level}
          className={`flex-1 h-1.5 rounded-full transition-colors ${
            securityLevel >= level ? colors[securityLevel] : colors[0]
          }`}
        ></div>
      ))}
    </div>
  );
};

export default PasswordLevels;
