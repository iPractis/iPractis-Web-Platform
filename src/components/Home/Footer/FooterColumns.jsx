import Image from "next/image";
import Link from "next/link";

export const OneFooterColumn = ({ column }) => {
  return (
    <div>
      <div>
        <h3 className="MT-SB-1 mb-2.5 text-primary-color-P1">
          {column?.title}
        </h3>

        <div className="text-primary-color-P1 space-y-1.5">
          {column?.columns?.map((column, index) => (
            <Link key={`col-${column?.title || 'item'}-${index}`} className="ST-3 block" href={"#"}>
              {column?.title}
            </Link>
          ))}

          {column?.columns?.[1]?.icons?.length && (
            <div className="flex xs:justify-start justify-center items-center gap-2.5">
              {column?.columns?.[1]?.icons?.map((icon, index) => (
                <Link key={`${icon?.href || 'icon'}-${index}`} href={icon?.href || "#"} className="mt-[31px]">
                  {typeof icon?.src === 'string' ? (
                    <Image
                      className={icon?.size || "w-[30px]"}
                      alt={icon?.alt || "Social Media Icon"}
                      src={icon?.src}
                      width={36}
                      height={36}
                    />
                  ) : (
                    <div className={icon?.size || "w-[30px]"}>
                      {icon?.src}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TwoFooterColumn = ({ columnOne, columnTwo }) => {
  return (
    <div className="flex flex-col gap-[31px]">
      {/* Column 1 */}
      <div>
        <h3 className="MT-SB-1 mb-2.5 text-primary-color-P1">
          {columnOne?.title}
        </h3>

        <div className="text-primary-color-P1 space-y-1.5">
          {columnOne?.columns?.map((column, index) => (
            <Link key={`col1-${column?.title || 'item'}-${index}`} className="ST-3 block" href={"#"}>
              {column?.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Column 2 */}
      <div>
        <h3 className="MT-SB-1 mb-2.5 text-primary-color-P1">
          {columnTwo?.title}
        </h3>

        <div className="text-primary-color-P1 space-y-1.5">
          {columnTwo?.columns?.map((column, index) => (
            <Link key={`col2-${column?.title || 'item'}-${index}`} className="ST-3 block" href={"#"}>
              {column?.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
