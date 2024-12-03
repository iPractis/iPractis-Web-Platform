const DualButton = ({ leftButtonText, rightButtonText }) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        type="button"
        className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4"
      >
        {leftButtonText}
      </button>

      <button
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
        type="submit"
      >
        {rightButtonText}
      </button>
    </div>
  );
};

export default DualButton;
