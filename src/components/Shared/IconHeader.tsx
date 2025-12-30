interface IconHeaderProps {
  icon: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const IconHeader = ({ icon, title, description, className }: IconHeaderProps) => {
  return (
    <div className={`flex items-center gap-[16px] h-[48px] ${className}`}>
      <div className="w-[48px] h-[48px] rounded-[16px] bg-secondary-color-S11 flex items-center justify-center p-[14px]">
        {icon}
      </div>
      {(title || description) && <div className="flex flex-col justify-center h-[48px]">
        {title && <h3 className="ST-SB-4 text-primary-color-P1 leading-none">{title}</h3>}
        {description && <p className="ST-3 text-primary-color-P4">{description}</p>}
      </div>}
    </div>
  );
};

export default IconHeader;