const IconHeader = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-[16px] h-[48px]">
      <div className="w-[48px] h-[48px] rounded-[16px] bg-secondary-color-S11 flex items-center justify-center p-[14px]">
        {icon}
      </div>
      <div className="flex flex-col justify-center h-[48px]">
        <h3 className="ST-SB-4 text-primary-color-P1 leading-none">{title}</h3>
        <p className="ST-3 text-primary-color-P4">{description}</p>
      </div>
    </div>
  );
};

export default IconHeader;