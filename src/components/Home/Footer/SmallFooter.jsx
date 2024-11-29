import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";

const SmallFooter = () => {
  return (
    <div className="bg-primary-color-P1">
      <div className="container-page py-2.5">
        <div className="flex flex-col-reverse sm:flex-row items-center sm:gap-[65px] gap-4">
          <div>
            <p className="ST-2 text-primary-color-P12">
              &copy; 2024 iPractis Limited.
            </p>
          </div>

          <div className="flex flex-col min-[430px]:flex-row items-center text-primary-color-P12 min-[430px]:gap-10 gap-4 ST-2">
            <Link href={"#"}>About us</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Contact us</Link>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallFooter;
