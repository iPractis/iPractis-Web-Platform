import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// React imports
import Link from "next/link";

// Icons
import { ChevronRightSmallestIcon, ComputerSmallestIcon } from "../../Icons";

const DeviceItem = ({ operatingSystem, searchEngine, location }) => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 flex gap-4 items-center rounded-2xl p-1.5 bg-primary-color-P11">
        <InputBGWrapperIcon>
          <ComputerSmallestIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <div>
          <h3 className="ST-SB-. text-primary-color-P1">
            {operatingSystem} - {searchEngine}
          </h3>
          <h4 className="ST-1 text-primary-color-P4">{location}</h4>
        </div>

        <Link className="ms-auto" href={"#"}>
          <InputBGWrapperIcon>
            <ChevronRightSmallestIcon fillColor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>
        </Link>
      </div>
    </div>
  );
};

export default DeviceItem;
