import Image from "next/image";
import Link from "next/link";

export const OneFooterColumn = ({ column }) => {
  return (
    <div>
      <div>
        <h3 className="MT-SB-1 mb-2.5 text-primary-color-P12">
          {column?.title}
        </h3>

        <div className="text-primary-color-P10 space-y-1.5">
          {column?.columns?.map((column, index) => (
            <Link key={index} className="ST-3 block" href={"#"}>
              {column?.title}
            </Link>
          ))}

          {column?.columns?.[1]?.icons?.length && (
            <div className="flex xs:justify-start justify-center items-center gap-2.5">
              {column?.columns?.[1]?.icons?.map((icon, index) => (
                <Link key={index} href={"#"} className="mt-[31px]">
                  <Image
                    className={icon?.size || "w-[30px]"}
                    alt={icon?.alt || "Social Media Icon"}
                    src={icon?.src}
                    key={index}
                  />
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
    <div className="flex flex-col justify-between">
      {/* Column 1 */}
      <div>
        <h3 className="MT-SB-1 mb-2.5 text-primary-color-P12">
          {columnOne?.title}
        </h3>

        <div className="text-primary-color-P10 space-y-1.5">
          {columnOne?.columns?.map((column, index) => (
            <Link key={index} className="ST-3 block" href={"#"}>
              {column?.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Column 2 */}
      <div className="mt-[31px]">
        <h3 className="MT-SB-1 mb-2.5 text-primary-color-P12">
          {columnTwo?.title}
        </h3>

        <div className="text-primary-color-P10 space-y-1.5">
          {columnTwo?.columns?.map((column, index) => (
            <Link key={index} className="ST-3 block" href={"#"}>
              {column?.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
