import Image from "next/image";
import Link from "next/link";

const PlatformButton = ({
  platformStoreSrc,
  platformStoreName,
  platformStoreLink,
  platformStoreAlt,
}) => (
  <Link
    className="btn btn-tertiary w-full px-8 py-4 rounded-[20px] flex items-center gap-4"
    rel="noopener noreferrer"
    href={platformStoreLink}
    target="_blank"
  >
    <Image className="w-8" src={platformStoreSrc} alt={platformStoreAlt} />

    <div className="text-start">
      <p className="text-primary-color-P4 ST-3">Available on</p>
      <p className="text-primary-color-P1 ST-SB-4">{platformStoreName}</p>
    </div>
  </Link>
);

export default PlatformButton;
